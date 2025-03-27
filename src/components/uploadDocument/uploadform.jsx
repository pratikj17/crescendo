import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Drag & Drop
  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFiles = Array.from(event.dataTransfer.files);
    validateFiles(selectedFiles);
  };

  // Handle File Selection
  const handleChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    validateFiles(selectedFiles);
  };

  // Validate Files (Only Accept .pdf, .docx, .png, .jpg)
  const validateFiles = (selectedFiles) => {
    const validExtensions = [".pdf", ".docx", ".png", ".jpg",".pptx",".html"];
    setErrorMessage("");

    const filteredFiles = selectedFiles.filter(
      (file) =>
        validExtensions.includes(file.name.slice(-4)) ||
        validExtensions.includes(file.name.slice(-5))
    );

    if (filteredFiles.length !== selectedFiles.length) {
      setErrorMessage("Some files have invalid formats.");
    }

    setFiles(filteredFiles);
  };

  // Upload Files to Backend
  const handleSave = async () => {
    if (files.length === 0) {
      setErrorMessage("No files selected!");
      return;
    }

    setLoading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file:", file.name);

        const response = await axios.post(
          "http://localhost:8000/api/v1/files/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true, // Ensures cookies are sent
          }
        );

        console.log("Upload response:", response.data);

        setUploadedFiles((prev) => [...prev, response.data.file_url]);
      }

      setFiles([]);
      setErrorMessage("");
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Upload failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.header}>Validate & Upload Files</h1>

        {/* Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={styles.dropArea}
        >
          <p>Drag and Drop the files</p>
          <p>or</p>

          {/* Hidden File Input */}
          <input
            type="file"
            multiple
            id="fileInput"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          {/* Button to Trigger File Selection */}
          <button
            style={styles.button}
            onClick={() => document.getElementById("fileInput").click()}
          >
            Select Files
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        {/* Selected Files List */}
        <div style={styles.fileList}>
          {files.length === 0 ? (
            <p>No Files Selected</p>
          ) : (
            files.map((file, index) => <p key={index}>{file.name}</p>)
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleSave}
          disabled={files.length === 0 || loading}
          style={styles.saveButton}
        >
          {loading ? "Uploading..." : "Save"}
        </button>

        {/* Uploaded Files List */}
        <div style={styles.uploadedList}>
          <h3>Uploaded Files</h3>
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map((url, index) => (
              <p key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </p>
            ))
          ) : (
            <p>No Files Uploaded Yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

// CSS Styles
const styles = {
    pageContainer: {
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#5F41E4", // Light background for contrast
    },
    container: {
      backgroundColor: "#ffffff", // White background for the container
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "500px",
      width: "90%",
      textAlign: "center",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Softer shadow
      transition: "transform 0.2s", // Smooth scaling effect
    },
    containerHover: {
      transform: "scale(1.02)", // Slightly scale up on hover
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333", // Darker text for better readability
    },
    dropArea: {
      border: "2px dashed #007bff",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "#e7f3ff", // Light blue background
      color: "#333",
      marginBottom: "15px",
      transition: "background-color 0.3s", // Smooth background color change
    },
    dropAreaHover: {
      backgroundColor: "#d0e7ff", // Darker blue on hover
    },
    button: {
      marginTop: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 15px",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "16px",
      transition: "background-color 0.3s, transform 0.2s", // Smooth transition
    },
    buttonHover: {
      backgroundColor: "#0056b3", // Darker blue on hover
      transform: "scale(1.05)", // Slightly scale up on hover
    },
    error: {
      color: "#d9534f", // Bootstrap danger color
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    fileList: {
      marginTop: "15px",
      textAlign: "center",
      color: "#333",
      fontWeight: "bold",
    },
    saveButton: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#28a745", // Green for save button
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s, transform 0.2s", // Smooth transition
    },
    saveButtonHover: {
      backgroundColor: "#218838", // Darker green on hover
      transform: "scale(1.05)", // Slightly scale up on hover
    },
    uploadedList: {
      marginTop: "20px",
      color: "#333",
      textAlign: "center",
    },
  };

export default FileUpload;