import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCamera } from '../../api/camera'; // Ensure this API function is defined to handle POST request

function AddCamera() {
  const [camera, setCamera] = useState({
    ip: '',
    latitude: 0.0,   // Initialize as float
    longitude: 0.0,  // Initialize as float
    startTime: '',   // Initialize as string for input field compatibility
    url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "latitude" || name === "longitude") {
      setCamera(prev => ({
        ...prev,
        [name]: parseFloat(value)  // Parse as float
      }));
    } else if (name === "startTime") {
      // Convert the date-time string to a timestamp when changing
      const timeValue = new Date(value).getTime();
      setCamera(prev => ({
        ...prev,
        startTime: timeValue  // Set as timestamp
      }));
    } else {
      setCamera(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Make sure to send a number for startTime if it is not empty
      const finalData = {
        ...camera,
        startTime: camera.startTime ? camera.startTime : null,
      };
      const response = await addCamera(finalData); // API call to add a new camera
      console.log('Camera added:', response);
      alert('Camera added successfully!');
      navigate('/cameras'); // Redirect to cameras list or another appropriate page
    } catch (error) {
      console.error('Failed to add camera:', error);
      setError('Failed to add camera');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/cameras');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ margin: '20px' }}>
      <h1>Add New Camera</h1>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>IP Address:</label>
          <input type="text" name="ip" value={camera.ip} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Latitude:</label>
          <input type="number" name="latitude" value={camera.latitude} onChange={handleChange} step="0.000001" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Longitude:</label>
          <input type="number" name="longitude" value={camera.longitude} onChange={handleChange} step="0.000001" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Start Time:</label>
          <input type="datetime-local" name="startTime" value={camera.startTime ? new Date(camera.startTime).toISOString().slice(0, -1) : ''} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>URL:</label>
          <input type="url" name="url" value={camera.url} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ marginRight: '10px', padding: '10px 20px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', borderRadius: '5px' }}>Add Camera</button>
        <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', border: 'none', backgroundColor: '#f44336', color: 'white', cursor: 'pointer', borderRadius: '5px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default AddCamera;
