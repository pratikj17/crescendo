import express from 'express';
import { upload } from '../uploadConfig.js'; // Import upload and s3
import { handleUpload,handleDownload } from '../controllers/file.controller.js';
import dotenv from "dotenv";
import { verifyIdentity } from '../middleware/identity.middleware.js';
dotenv.config();

const fileRouter = express.Router();

// Upload Route
fileRouter.post("/upload", upload.single("file"), handleUpload);

// Download Route
fileRouter.get("/download/:fileKey", handleDownload);

export default fileRouter;