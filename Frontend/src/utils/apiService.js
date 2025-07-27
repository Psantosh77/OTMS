import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:9000/api',
  withCredentials: true, // send cookies
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

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

    // Handle 401 errors with token refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Handle refresh failure (e.g., redirect to home page)
        window.location.href = '/';
      }
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
    } catch (error) {
      if (onError && typeof onError === 'function') {
        onError(
          error.response?.data?.message || error.message || 'Unknown error occurred',
          error.response?.status
        );
      }
    }
  }

  setBaseUrl(url) {
    this.api.defaults.baseURL = url;
  }

  setDefaultHeader(key, value) {
    this.api.defaults.headers.common[key] = value;
  }
}


export const apiService = new ApiService();
export default api;
