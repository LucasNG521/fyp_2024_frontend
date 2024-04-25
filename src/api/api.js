import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Function to fetch all animals
export const fetchAnimals = async () => {
  try {
    const response = await apiClient.get('/animals');
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Function to fetch a single animal by its ID
export const fetchAnimalById = async (animalId) => {
    try {
      const response = await apiClient.get(`/animals/${animalId}`);
      console.log('res ', response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Function to perform login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
