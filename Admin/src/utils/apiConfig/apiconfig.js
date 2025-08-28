import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL:  'https://otms.onrender.com/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors globally
    if (error.response && error.response.status === 401) {
      // Optionally handle unauthorized globally
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
