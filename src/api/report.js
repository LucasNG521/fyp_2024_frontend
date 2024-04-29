import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const fetchReports = async () => {
  try {
    const response = await apiClient.get('/reports');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchReportsById = async (reportId) => {
  try {
    const response = await apiClient.get(`/reports/${reportId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeReport = async (reportId) => {
  try {
    const response = await apiClient.delete(`/reports/${reportId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

