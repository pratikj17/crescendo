import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../uploadConfig.js'; // Import upload and s3
import dotenv from "dotenv";
dotenv.config();


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

export const handleUpload=async (req, res) => {
    console.log(req.body);
    try {
        if (!req.file) {
        return res.status(400).json({ message: "File upload failed" });
        }

        res.json({
        message: "File uploaded successfully",
        file_url: req.file.location,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const handleDownload=async (req, res) => {
    try {
      console.log("Generating signed URL...");
      const fileKey = req.params.fileKey;
  
      // Get the correct content type
      const contentType = getContentType(fileKey);
  
      // Check current metadata (optional but useful)
      const headCommand = new HeadObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folder}/${fileKey}`,
      });
  
      const headResponse = await s3.send(headCommand);
      if (!headResponse.ContentType || headResponse.ContentType === "application/octet-stream") {
        await updateMetadata(fileKey, contentType); // Update metadata if needed
      }
  
      // Generate signed URL with correct content type
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