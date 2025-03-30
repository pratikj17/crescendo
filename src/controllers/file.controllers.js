import { GetObjectCommand, HeadObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../uploadConfig.js';
import { Assignments } from '../models/assignments.model.js';
import dotenv from "dotenv";
dotenv.config();
import { sendVerificationEmail } from "../utils/NodeMailer.js";
import { ServiceBusClient } from "@azure/service-bus";
import { Student } from '../models/student.model.js';

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const TOPIC_NAME = process.env.TOPIC_NAME;
const SUBSCRIPTION_NAME = process.env.SUBSCRIPTION_NAME;
const folder = "uploads";

// Function to update metadata if Content-Type is missing or incorrect
async function updateMetadata(fileKey, contentType) {
  const command = new CopyObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    CopySource: `${process.env.S3_BUCKET_NAME}/${folder}/${fileKey}`,
    Key: `${folder}/${fileKey}`,
    MetadataDirective: "REPLACE",
    ContentType: contentType,
  });

  await s3.send(command);
  console.log(`Metadata updated for ${fileKey} to ${contentType}`);
}

// Function to determine content type based on file extension
function getContentType(fileKey) {
  const extension = fileKey.split(".").pop().toLowerCase();
  const mimeTypes = {
    pdf: "application/pdf",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    doc: "application/msword",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ppt: "application/vnd.ms-powerpoint",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    txt: "text/plain",
    csv: "text/csv",
    json: "application/json",
    zip: "application/zip",
    mp4: "video/mp4",
    mp3: "audio/mpeg",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
  };

  return mimeTypes[extension] || "application/octet-stream"; // Default if unknown
}

export const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const fileUrl = req.file.location;
    const fileKey = req.file.key || req.file.Key;
    const { name, time } = req.body;
    const batch = req.query.batch;
    const currentTime = new Date();
    console.log("Upload time:", currentTime);

    // Send message to Service Bus
    await sendMessageToServiceBus({ fileUrl, fileKey, name, time, batch });

    res.json({
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.error("Error in handleUpload:", err);
    res.status(500).json({ message: err.message });
  }
};

const sendMessageToServiceBus = async ({ fileUrl, fileKey, name, time, batch }) => {
  const serviceBusClient = new ServiceBusClient(CONNECTION_STRING);
  const sender = serviceBusClient.createSender(TOPIC_NAME);

  try {
    const message = {
      body: JSON.stringify({ fileUrl, fileKey, name, time, batch }),
      contentType: "application/json"
    };

    // The sendMessages method resolves without a value if successful.
    await sender.sendMessages([message]);
    console.log("Message sent to Azure Service Bus successfully.");
  } catch (error) {
    console.error("Error sending message to Azure Service Bus:", error);
  } finally {
    await sender.close();
    await serviceBusClient.close();
  }
};

export const receiveMessages = async (req, res) => {
  const serviceBusClient = new ServiceBusClient(CONNECTION_STRING);
  const receiver = serviceBusClient.createReceiver(TOPIC_NAME, SUBSCRIPTION_NAME);

  console.log("Listening for messages...");

  receiver.subscribe({
    processMessage: async (message) => {
      console.log(`Received message: ${message.body}`);

      try {
        const { fileUrl, fileKey, name, time, batch } = JSON.parse(message.body);
        console.log("Message details:", fileUrl, fileKey, name, time, batch);

        // Validate message data
        if (!fileKey || !fileUrl || !name || !time || !batch) {
          console.error("Missing data in message. Skipping...");
          return;
        }

        const currentTime = new Date();
        const releaseTime = new Date(time);
        const delayInMilliseconds = releaseTime - currentTime;

        console.log("Current time:", currentTime);
        console.log("Release time:", releaseTime);
        console.log("Delay in milliseconds:", delayInMilliseconds);

        // Save assignment after the delay if necessary
        if (delayInMilliseconds > 0) {
          setTimeout(async () => {
            await saveAssignment(fileKey, fileUrl, name, time, batch);
          }, delayInMilliseconds);
        } else {
          console.log("Assignment is now visible!");
          await saveAssignment(fileKey, fileUrl, name, time, batch);
        }

        await sendVerificationEmails(batch);
        await receiver.completeMessage(message);

        // Send verification emails
       

      } catch (err) {
        console.error("Error processing message:", err);
      }
    },
    processError: async (err) => {
      console.error("Error receiving messages:", err);
    }
  });
};

// Function to save assignment to the database
const saveAssignment = async (fileKey, fileUrl, name, time, batch) => {
  try {
    const newAssignment = new Assignments({
      fileKey,
      fileUrl,
      name,
      time,
      batch
    });

    await newAssignment.save();
    console.log("Assignment saved to database:", newAssignment);
  } catch (dbError) {
    console.error("Error saving assignment to database:", dbError);
  }
};

// Function to send verification emails
const sendVerificationEmails = async (batch) => {
  try {
    const users = await Student.find({ Batch: batch }, "email");
    const emails = users.map(user => user.email);

  
    for (const email of emails) {
      console.log(`Sending email to: ${email}`);
      await sendVerificationEmail(email);
    }

    console.log("All emails sent successfully!");
  } catch (err) {
    console.error("Error sending verification emails:", err);
  }
};

export const handleDownload = async (req, res) => {
  try {
    console.log("Generating signed URL...");
    const fileKey = req.params.fileKey;
    const contentType = getContentType(fileKey);

    // Check current metadata
    const headCommand = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folder}/${fileKey}`,
    });
    const headResponse = await s3.send(headCommand);
    if (!headResponse.ContentType || headResponse.ContentType === "application/octet-stream") {
      await updateMetadata(fileKey, contentType); // Update metadata if needed
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folder}/${fileKey}`,
      ResponseContentType: contentType,
      ResponseContentDisposition: ["pdf", "png", "jpg", "jpeg", "gif", "svg"].includes(fileKey.split(".").pop().toLowerCase())
        ? "inline"
        : "attachment",
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    res.json({ download_url: signedUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
