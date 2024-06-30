import axios from "axios";
import React, { useState } from "react";

// Component UploadImage
const UploadImage = ({ onUpload, uploadedImageUrl, context, handleReset }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        onUpload({ base64: reader.result, file });
      };
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          borderBottom: "1px solid #ccc",
          padding: "10px 0",
        }}
      >
        <div
          style={{
            width: "100px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
            border: "1px solid #ccc",
          }}
        >
          <h3>Context</h3>
          <p>{context}</p>
        </div>

        <div
          style={{
            width: "60%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Input Image</h2>
          
          {uploadedImageUrl && (
            <img
              src={uploadedImageUrl.base64}
              alt="Uploaded"
              style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
            />
          )}
          <div style={{}}>
            <div style={{ marginBottom: "20px" }}>
              <button
                onClick={() => document.getElementById("fileInput").click()}
                style={{ padding: "10px 20px", margin: "5px" }}
              >
                Import from file
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                onClick={handleReset}
                style={{ padding: "10px 20px", margin: "5px" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Component ImageAnalysis
const ImageAnalysis = ({ imageInfo }) => {
  return (
    <div
      style={{
        width: "800px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <h2>Image Analysis</h2>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e2e8f0",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          textAlign: "left",
          maxHeight: "300px", // Adjust the height as needed
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <pre>{imageInfo}</pre>
      </div>
      {/* <div className="">
        <button
          onClick={() => console.log("Chain with...")}
          style={{ padding: "10px 20px", margin: "5px" }}
        >
          Chain with...
        </button>
        <button
          onClick={() => console.log("Save as...")}
          style={{ padding: "10px 20px", margin: "5px" }}
        >
          Save as...
        </button>
        <button
          onClick={() => console.log("Copy to clipboard")}
          style={{ padding: "10px 20px", margin: "5px" }}
        >
          Copy to clipboard
        </button>
      </div> */}
    </div>
  );
};

// Main Page Component
const Page = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageInfo, setImageInfo] = useState("");
  //const context = "#Shopping #Grocery Store #Outlets";
  const context = "";
  const API_URL = "https://my-service-4ylilurj2q-as.a.run.app";

  const handleUpload = async ({ base64, file }) => {
    setUploadedImageUrl({ base64, file });

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(`${API_URL}/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);
      // setImageInfo(`Image uploaded successfully!`);
      const uploadedImageUrl = response.data.imageUrl;
      setUploadedImageUrl({ base64: uploadedImageUrl, file });
    } catch (error) {
      console.error(error);
      setImageInfo(`Error uploading image: ${error.message}`);
    }
  };

  const handleReset = () => {
    setUploadedImageUrl(null);
    setImageInfo("");
  };

  return (
    <div style={styles.main}>
      <UploadImage
        onUpload={handleUpload}
        uploadedImageUrl={uploadedImageUrl}
        context={context}
        handleReset={handleReset}
      />
      <ImageAnalysis imageInfo={imageInfo} />
    </div>
  );
};

export default Page;

const styles = {
  upload: {},
  analysis: {},
  main: {
    display: "flex",
    height: "auto",
    minHeight: "500px",
    width: "1300px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
