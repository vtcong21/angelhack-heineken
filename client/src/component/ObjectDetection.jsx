import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ObjectDetection = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [stats, setStats] = useState(null);
    const [annotations, setAnnotations] = useState(null);
    const [uploaded, setUploaded] = useState(false); // State to track if file has been uploaded

    // Function to reset all states and dropzone
    const resetDropzone = useCallback(() => {
        setFile(null);
        setPreview(null);
        setStats(null);
        setAnnotations(null);
        setUploaded(false);
    }, []);

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFile(file);
        setPreview(URL.createObjectURL(file));
        setStats(null); // Reset stats when a new file is dropped
        setAnnotations(null); // Reset annotations
        setUploaded(true); // Mark file as uploaded

        // Upload file and get annotations
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('YOUR_API_ENDPOINT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setStats(response.data.stats); 
            setAnnotations(response.data.annotations); 
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // Function to handle reset action
    const handleReset = () => {
        resetDropzone();
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, disabled: uploaded });

    const renderAnnotations = () => {
        if (!annotations || annotations.length === 0) return null; // Check if annotations are empty or null
    
        const labelColors = [
            '#00FF00', '#0000FF', '#FF0000', '#FFFF00', '#FFA500',
            '#FF69B4', '#800080', '#008000', '#000080', '#800000',
            '#808000', '#008080', '#C0C0C0', '#808080', '#FFD700',
            '#ADD8E6', '#20B2AA' 
        ];
    
        return annotations.map((annotation, index) => {
            const { x, y, width, height, label } = annotation;
            const color = labelColors[index % labelColors.length];
    
            const labelStyle = {
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: `${width}%`,
                height: `${height}%`,
                border: `2px solid ${color}`,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                boxSizing: 'border-box',
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333333',
            };
    
            return (
                <div key={index} style={labelStyle}>
                    <div style={{ padding: '5px' }}>{label}</div>
                </div>
            );
        });
    };

    return (
        <div style={containerStyle}>
            <div {...getRootProps({ className: 'dropzone' })} style={{
                ...dropzoneStyle,
                ...(isDragActive ? dropzoneActiveStyle : {}),
            }}>
                <input {...getInputProps()} />
                {preview ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                        <img src={preview} alt="Preview" style={imageStyle} />
                        {renderAnnotations()}
                    </div>
                ) : (
                    <p>Drag & drop a file here, or click to select a file</p>
                )}
            </div>
            <div style={buttonContainerStyle}>
                <button onClick={handleReset} style={buttonStyle}>Reset</button>
                <button onClick={() => resetDropzone()} style={buttonStyle}>New File</button>
            </div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
};

const dropzoneStyle = {
    height: '400px',
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
};

const dropzoneActiveStyle = {
    borderColor: '#0000ff', 
    backgroundColor: '#f0f8ff', 
};

const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    objectFit: 'contain',
};

const buttonContainerStyle = {
    marginTop: '20px',
};

const buttonStyle = {
    marginRight: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default ObjectDetection;
