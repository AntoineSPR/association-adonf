import axios from 'axios';

/**
 * Helper function to get the base API URL
 */
export function getApiUrl(): string {
  if (typeof process !== "undefined" && process.env.PUBLIC_API_URL) {
    return process.env.PUBLIC_API_URL;
  }
  return import.meta.env.PUBLIC_API_URL || 'https://localhost:7168';
}

// Create an Axios instance
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token to the Authorization header
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login page if not already there
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
