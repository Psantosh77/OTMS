import axios from 'axios';

// Create an Axios instance
const api = axios.create({
 // baseURL:  'https://otms.onrender.com/api/',
 baseURL:  'http://localhost:9000/api/',
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
    const originalRequest = error.config;
    // If 401 and we haven't retried yet, try refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Call refresh endpoint (assumes refresh token is in cookie)
      return api.post('/auth/refresh-token')
        .then((res) => {
          if (res?.data?.success && res.data.data?.accessToken) {
            const newAccess = res.data.data.accessToken;
            localStorage.setItem('token', newAccess);
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
            return api(originalRequest);
          }
          // otherwise redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        })
        .catch((refreshErr) => {
          // Refresh failed, redirect to login
          window.location.href = '/login';
          return Promise.reject(refreshErr);
        });
    }
    // Other errors
    return Promise.reject(error);
  }
);

export default api;
