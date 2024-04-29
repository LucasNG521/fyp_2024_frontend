import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const types = ['image/png', 'image/jpeg']; // Define acceptable file types

    const handleChange = (e) => {
        let selectedFiles = Array.from(e.target.files);
        let allFilesValid = selectedFiles.every(file => types.includes(file.type));

        if (selectedFiles && allFilesValid) {
            setFiles(selectedFiles);
            setError('');
            setUploadStatus('');
        } else {
            setFiles([]);
            setError('Please select image files (png or jpg) only.');
            setUploadStatus('');
        }
    };

    const handleUpload = () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file); // 'files' as the key to match server side
        });

        axios.post('http://localhost:8080/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setUploadStatus(`Successfully uploaded ${response.data.urls.length} files!`);
            console.log('Files uploaded:', response.data.urls);
        })
        .catch(error => {
            setError('Error uploading files: ' + error.message);
            console.log(error);
        });
    };

    return (
        <div>
            <input type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {uploadStatus && <div style={{ color: 'green' }}>{uploadStatus}</div>}
        </div>
    );
};

export default ImageUpload;

// usage

// import React from 'react';
// import ReactDOM from 'react-dom';
// import ImageUpload from './ImageUpload';

// ReactDOM.render(<ImageUpload />, document.getElementById('root'));