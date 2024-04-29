import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchCameras, updateCamera } from '../../api/camera';

function EditCamera() {
  const [camera, setCamera] = useState({
    ip: '',
    latitude: '',
    longitude: '',
    startTime: '',
    url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { cameraId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCameraData = async () => {
      try {
        setLoading(true);
        const camerasData = await fetchCameras();
        const foundCamera = camerasData.find(cam => cam.cameraId === cameraId);
        if (foundCamera) {
          setCamera({
            ...foundCamera,
            startTime: foundCamera.startTime ? new Date(foundCamera.startTime).toISOString().slice(0, -1) : ''
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch camera data:', error);
        setLoading(false);
        setError('Failed to fetch camera data');
      }
    };

    loadCameraData();
  }, [cameraId]);

  const handleChange = (e) => {
    setCamera({
      ...camera,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateCamera(cameraId, {
        ...camera,
        startTime: new Date(camera.startTime).getTime() // Convert back to epoch time for the API
      });
      alert('Camera updated successfully!');
      navigate('/cameras');
    } catch (error) {
      console.error('Failed to update camera:', error);
      setError('Failed to update camera');
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
      <h1>Edit Camera</h1>
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
        {camera.startTime && (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Start Time:</label>
            <input type="datetime-local" name="startTime" value={camera.startTime} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        )}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>URL:</label>
          <input type="url" name="url" value={camera.url} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ marginRight: '10px', padding: '10px 20px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', borderRadius: '5px' }}>Update Camera</button>
        <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', border: 'none', backgroundColor: '#f44336', color: 'white', cursor: 'pointer', borderRadius: '5px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default EditCamera;
