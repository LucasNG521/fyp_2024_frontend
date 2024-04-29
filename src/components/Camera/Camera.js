import React, { useEffect, useState } from 'react';
import { fetchCameras, removeCamera } from '../../api/camera'; 
import { useNavigate } from 'react-router-dom';

function Camera() {
  const [cameras, setCameras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const camerasData = await fetchCameras();
        setCameras(camerasData);
      } catch (error) {
        alert('Failed to fetch data: ' + error.message);
      }
    };

    loadData();
  }, []);

  const handleRemove = async (cameraId) => {
    try {
      await removeCamera(cameraId);
      setCameras(cameras.filter(camera => camera.cameraId !== cameraId));
      alert('Camera removed successfully!');
    } catch (error) {
      alert('Failed to remove camera: ' + error.message);
    }
  };

  const handleEdit = (cameraId) => {
    navigate(`/edit-camera/${cameraId}`);
  };

  const handleAddCamera = () => {
    navigate('/add-camera');
  };

  return (
    <div>
      <h1>Camera</h1>
      <button onClick={handleAddCamera} style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Add New Camera
      </button>
      <h4>Total Cameras: {cameras.length}</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>IP Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Start Time</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cameras.map(camera => (
            <tr key={camera.cameraId}>
              <td>{camera.cameraId}</td>
              <td>{camera.ip}</td>
              <td>{camera.latitude}</td>
              <td>{camera.longitude}</td>
              <td>{new Date(camera.startTime).toLocaleString()}</td>
              <td><a href={camera.url} target="_blank" rel="noopener noreferrer">{camera.url}</a></td>
              <td>
                <button onClick={() => handleEdit(camera.cameraId)}>Edit</button>
                <button onClick={() => handleRemove(camera.cameraId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        button {
          margin-right: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Camera;
