import axios from 'axios';

const API_BASE_URL = 'https://fyp2024.azurewebsites.net';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
