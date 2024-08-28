import "./fileUpload.css";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload() {
  // State variables to manage file, upload progress, and status
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  // Function to handle file drop or selection
  const onDrop = async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    // Create a URL for the file preview if it's an image
    if (selectedFile.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }

    setFile(selectedFile);

    // Prepare form data for upload
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Attempt to upload the file
      const response = await fetch("https://v2.convertapi.com/upload", {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          // Calculate and update upload progress
          const percentage = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(Math.round(percentage));
          setUploadStatus(`${Math.round(percentage)}% uploaded`);
        },
      });

      // Handle the upload response
      const result = await response.text();
      setUploadStatus(result);
      setUploadProgress(0);
    } catch (error) {
      setUploadStatus("Upload failed, please try again.");
      setUploadProgress(0);
    }
  };

  // Set up the dropzone using react-dropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Render the component
  return (
    <div className="file-upload-container">
      <h1>File Upload</h1>
      {/* Dropzone area */}
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select a file</p>
      </div>
      {/* Upload progress bar */}
      <label>
        File Progress:
        <progress value={uploadProgress} max={100}></progress>
      </label>
      {/* Upload status message */}
      <p className="upload-status">
        {uploadStatus.length > 50
          ? `${uploadStatus.substring(0, 50)}...`
          : uploadStatus}
      </p>
      {/* Preview of uploaded file */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Uploaded file preview"
          className="file-preview"
        />
      )}
      {file && !previewUrl && (
        <p>File selected: {file.name} (No preview available)</p>
      )}
    </div>
  );
}
