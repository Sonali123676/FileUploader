import React, { useState } from "react";
import "./FileUploader.css";

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const selectedFile = event.dataTransfer.files[0];
    setFile(selectedFile);
    showFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    showFile(selectedFile);
  };

  const showFile = (selectedFile) => {
    const fileType = selectedFile.type;
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileURL = fileReader.result;
        setFile(fileURL); // Update the file state with the URL
      };
      fileReader.readAsDataURL(selectedFile);
      alert("file uploaded");
    } else {
      alert("This is not an Image File!");
      setFile(null);
    }
  };

  return (
    <div
      className={`drag-area ${isDragging ? "active" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="icon">
        <i className="fas fa-cloud-upload-alt"></i>
      </div>
      <header>Drag & Drop to Upload File</header>
      <span>OR</span>
      <label htmlFor="fileInput" className="file-label">
        Browse File
        <input
          type="file"
          id="fileInput"
          hidden
          onChange={handleFileInputChange}
        />
      </label>
      {/* {file && <img src={file} alt="image" />}{" "}
      Render the img element conditionally */}
    </div>
  );
};

export default FileUpload;
