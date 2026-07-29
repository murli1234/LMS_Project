import axios from 'axios';

// Base URL for the backend API (use VITE_API_URL in Docker; defaults for local dev)
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// Request interceptor - Add JWT token to all requests (except auth endpoints)
axiosInstance.interceptors.request.use(
  (config) => {
    // Don't add token for auth endpoints
    const isAuthEndpoint = config.url?.includes('/auth/');
    
    if (!isAuthEndpoint) {
      const token = localStorage.getItem('token');
      if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 401 Unauthorized - redirect to login
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      // 403 Forbidden - show access denied
      if (error.response.status === 403) {
        alert('Access Denied: You do not have permission to perform this action.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
