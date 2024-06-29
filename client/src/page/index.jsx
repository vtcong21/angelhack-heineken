import React, { useState } from "react";
import axios from "axios";
// Component UploadImage
const UploadImage = ({ onUpload, uploadedImageUrl }) => {
  const handleUpload = (event) => {
    const file = event.target.files[0];
    onUpload(URL.createObjectURL(file));
  };

  return (
    <div
      style={{
        backgroundColor: "#d1d5db",
        padding: "20px",
        flex: 1,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 className="text-red-600 ">Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploadedImageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image</h3>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
      <button >Send</button>
    </div>
  );
};

// Component FetchAndRenderImage
const FetchAndRenderImage = () => {
  const [imageUrl, setImageUrl] = useState("");

 const fetchImage = async () => {
    console.log("Fetching image...");
   try {
     const response = await axios.get(
       "https://images.unsplash.com/photo-1719216324463-92a973ebf910?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
     ); // Thay thế URL API thực tế
     setImageUrl(response.data.imageUrl);
     console.log("Image fetched:", response.data.imageUrl);
   } catch (error) {
     console.error("Error fetching image:", error);
   }
 };
  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        padding: "20px",
        flex: 1,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Fetched Image</h2>
      <button onClick={fetchImage}>Fetch Image</button>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Fetched"
          style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
        />
      )}
    </div>
  );
};

// Main Page Component
const Page = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        height: "100vh",
      }}
    >
      <FetchAndRenderImage />
      <UploadImage
        onUpload={setUploadedImageUrl}
        uploadedImageUrl={uploadedImageUrl}
      />
    </div>
  );
};

export default Page;
