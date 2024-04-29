import axios from 'axios';

const API_BASE_URL = 'https://fyp2024.azurewebsites.net';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const fetchCameras = async () => {
  try {
    const response = await apiClient.get('/cameras');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCameras = async (data) => {
  try {
    const response = await apiClient.post(`/cameras`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCameras = async (cameraId, data) => {
  try {
    const response = await apiClient.put(`/cameras/${cameraId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCameras = async (cameraId) => {
  try {
    const response = await apiClient.delete(`/cameras/${cameraId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
