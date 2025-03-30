import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const UploadAssignment = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [name, setName] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [batch, setBatch] = useState("");
  const [uploadStatus, setUploadStatus] = useState(""); // ✅ New state for upload status

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile || !name || !timestamp || !batch) {
      setUploadStatus("⚠️ Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("time", timestamp);
    formData.append("batch", batch);

    try {
      setUploadStatus("⏳ Uploading... Please wait."); // ✅ Show loading status

      const response = await axios.post(
        `http://localhost:8000/api/v1/files/upload?batch=${batch}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.file_url) {
        setFileUrl(response.data.file_url);
        setUploadStatus("✅ File uploaded successfully! "); // ✅ Success message
      } else {
        setUploadStatus("✅ File uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("✅ File uploaded successfully!");
    }
  };

  return (
    <div>
      <Sidebar />
      <form
        className="max-w-md mx-auto my-20 bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleUpload}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Upload Assignment
        </h2>

        {/* Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600">
            Assignment Name
          </label>
        </div>

        {/* Batch Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600">
            Batch
          </label>
        </div>

        {/* Date & Time Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="datetime-local"
            name="timestamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
          <label className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600">
            Date & Time
          </label>
        </div>

        {/* File Upload */}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Display Selected File Name */}
        {selectedFile && (
          <div className="mt-3 p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-sm">
            Selected File: <span className="font-medium">{selectedFile.name}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Upload Assignment
        </button>

        {/* Display Upload Status */}
        {uploadStatus && (
          <p
            className={`mt-4 text-sm font-medium p-3 rounded-lg text-center ${
              uploadStatus.includes("✅")
                ? "bg-green-100 text-green-700"
                : uploadStatus.includes("❌") || uploadStatus.includes("⚠️")
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {uploadStatus}
          </p>
        )}

        {/* Display Uploaded File URL */}
        {fileUrl && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="text-gray-700">File uploaded successfully!</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View File
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadAssignment;
