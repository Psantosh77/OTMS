import axios from "axios";
import { useNavigate } from "react-router-dom";

// Get environment variables with fallbacks
const getApiBaseUrl = () => {
  // Check if we're in production mode
  const isProd = import.meta.env.MODE === 'production' || import.meta.env.PROD;
  
  if (isProd) {
    return import.meta.env.VITE_API_BASE_URL || 'https://otms.onrender.com/api';
  }
  
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true, // send cookies (for CORS, must be set here)
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// Ensure cookies are sent in all requests (especially for cross-origin)
api.interceptors.request.use(
  (config) => {
    config.withCredentials = true; // force withCredentials on every request

    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

    // Log the base URL in development
    if (import.meta.env.DEV) {
      console.log('API Base URL:', config.baseURL);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Return raw response without transformation
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
  const navigate = useNavigate();

    // Handle 401 errors with token refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
     // window.location.href = '/'; // Navigate to home on 401
     navigate('/');
      return; // Prevent further processing
    }

    // Return raw error without transformation
    return Promise.reject(error);
  }
);

class ApiService {
  constructor() {
    this.api = api;
  }

  async post(endpoint, data = null, options = {}, onSuccess = null, onError = null) {
    try {
      const response = await this.api.post(endpoint, data, options);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response);
      }
      return response;
    } catch (error) {
      if (onError && typeof onError === 'function') {
        onError(
          error.response?.data?.message || error.message || 'Unknown error occurred',
          error.response?.status
        );
      }
      throw error;
    }
  }

  setBaseUrl(url) {
    this.api.defaults.baseURL = url;
  }

  setDefaultHeader(key, value) {
    this.api.defaults.headers.common[key] = value;
  }

  // Method to get current API base URL
  getBaseUrl() {
    return this.api.defaults.baseURL;
  }
}

export const apiService = new ApiService();
export default api;