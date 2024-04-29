import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const fetchAnimals = async () => {
  try {
    const response = await apiClient.get('/animals');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAnimalById = async (animalId) => {
  try {
    const response = await apiClient.get(`/animals/${animalId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAnimal = async (data) => {
  try {
    const response = await apiClient.post(`/animals`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAnimal = async (animalId, data) => {
  try {
    const response = await apiClient.put(`/animals/${animalId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeAnimal = async (animalId) => {
  try {
    const response = await apiClient.delete(`/animals/${animalId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
