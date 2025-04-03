import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Conversion services
export const convertPdfToXml = (formData) => {
  return api.post('/conversions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const getConversions = () => api.get('/conversions');
export const getConversion = (id) => api.get(`/conversions/${id}`);

export default api;
