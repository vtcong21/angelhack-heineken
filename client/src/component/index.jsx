import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

// Component UploadImage

const UploadImage = ({ onUpload, uploadedImageUrl, context }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          onUpload({ base64: reader.result, file });
        };
      }
    },
  });

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
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select one</p>
          </div>
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
                onClick={() => console.log("Import from file")}
                style={{ padding: "10px 20px", margin: "5px" }}
              >
                Import from file
              </button>
              <button
                onClick={() => console.log("Copy to clipboard")}
                style={{ padding: "10px 20px", margin: "5px" }}
              >
                Copy to clipboard
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
      <div className="">
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
      </div>
    </div>
  );
};

// Main Page Component

const Page = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageInfo, setImageInfo] = useState("");
  const context = "#Shopping #Grocery Store #Outlets";
const API_URL = "https://my-service-4ylilurj2q-as.a.run.app";

  const handleUpload = async ({ base64, file }) => {
    setUploadedImageUrl({ base64, file });
    // Simulate image analysis information, in reality you would need to call an image analysis API here
    setImageInfo(`General Image Info:
      File size: 102,209 bytes (99.81kb)
      Width/Height: 1280x800 pixels
      Aspect ratio: 1.6
      Format: jpg

      Transparency Properties:
      Opacity: yes (1024000 pixels, 100%)
      Transparency: no
      Translucency: no

      Image Pixels:
      Number of pixels: 1024000
      Unique color pixels: 61440 (61440 pixels, 6%)
      Grayscale pixels: 331 (331 pixels, 0.03%)
      Colorful pixels: 1023669 (1023669 pixels, 99.97%)`);

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${API_URL}/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.main}>
      <UploadImage
        onUpload={handleUpload}
        uploadedImageUrl={uploadedImageUrl}
        context={context}
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
