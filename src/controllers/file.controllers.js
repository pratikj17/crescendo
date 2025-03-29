import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../uploadConfig.js'; // Import upload and s3
import { Assignments } from '../models/assignments.model.js';
import dotenv from "dotenv";
dotenv.config();

import { ServiceBusClient } from "@azure/service-bus";

const CONNECTION_STRING = "Endpoint=sb://arinjayservicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=s7N+jAlA4KoWO7YTDqdTCdzXdkdbTXhyV+ASbEtcppk=";
const TOPIC_NAME = "servicebusdemotopic1"
const SUBSCRIPTION_NAME = "servicebusdemosubscription1"



const folder="uploads"
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

      await sendMessageToServiceBus({ fileUrl, fileKey, name, time, batch });

      res.json({
          message: "File uploaded successfully",
      });

  } catch (err) {
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

      await sender.sendMessages(message);
      console.log("Message sent to Azure Service Bus");

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
              console.log(fileUrl, fileKey, name, time, batch);

              if (!fileKey || !fileUrl || !name || !time || !batch) {
                  console.error("Missing data in message. Skipping...");
                  return;
              }

              const currentTime = new Date();
              const releaseTime = new Date(time);
              const delayInMilliseconds = releaseTime - currentTime;
              console.log(currentTime)
              console.log(releaseTime)

              // Convert milliseconds to seconds
              const delayInSeconds = Math.max(Math.floor(delayInMilliseconds / 1000), 0);
              console.log("Delay in milliseconds:", delayInMilliseconds);
              console.log("Delay in seconds:", delayInSeconds);

              if (delayInMilliseconds > 0) {
                  setTimeout(async () => {
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
                  }, delayInMilliseconds); // Use delayInMilliseconds directly
              } else {
                  console.log(`Assignment is now visible!`);
                  // Save immediately if the release time is in the past
                  const newAssignment = new Assignments({
                      fileKey,
                      fileUrl,
                      name,
                      time,
                      batch
                  });

                  await newAssignment.save();
                  console.log("Assignment saved to database:", newAssignment);
              }

              await receiver.completeMessage(message);
          } catch (err) {
              console.error("Error processing message:", err);
          }
      },
      processError: async (err) => {
          console.error("Error receiving messages:", err);
      }
  });
};


export const handleDownload=async (req, res) => {
    try {
      console.log("Generating signed URL...");
      const fileKey = req.params.fileKey;
  
     
      const contentType = getContentType(fileKey);
  
    
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
        ResponseContentType: contentType, // Set correct content type
        ResponseContentDisposition: ["pdf", "png", "jpg", "jpeg", "gif", "svg"].includes(fileKey.split(".").pop().toLowerCase())
          ? "inline" // Open directly in browser for these types
          : "attachment", // Force download for other types
      });
  
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  
      res.json({ download_url: signedUrl });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }