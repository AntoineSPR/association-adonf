import axios from 'axios';

/**
 * Helper function to get the base API URL
 */
export function getApiUrl(): string {
  if (typeof process !== 'undefined' && process.env.PUBLIC_API_URL) {
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

/**
 * Clears the session and sends the user back to the login page with a reason
 * it can display ("your session expired, please sign in again").
 */
function forceLogout(reason: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  if (!window.location.pathname.includes('/admin/login')) {
    sessionStorage.setItem('adminLogoutReason', reason);
    window.location.href = '/admin/login';
  }
}

// Ensures concurrent 401s only trigger a single refresh call; the rest wait
// for its result and are retried (or fail together) once it settles.
let isRefreshing = false;
let refreshWaiters: ((token: string | null) => void)[] = [];

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    // Plain axios (not the `api` instance) so this call never re-enters
    // the response interceptor below.
    const response = await axios.post(`${getApiUrl()}/user/refresh`, {
      refreshToken,
    });
    const { token, refreshToken: newRefreshToken, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', newRefreshToken);
    if (user) localStorage.setItem('user', JSON.stringify(user));
    return token;
  } catch {
    return null;
  }
}

// Response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      typeof window !== 'undefined' &&
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        const newToken = await new Promise<string | null>((resolve) => {
          refreshWaiters.push(resolve);
        });
        if (!newToken) return Promise.reject(error);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      isRefreshing = true;
      const newToken = await refreshAccessToken();
      isRefreshing = false;
      refreshWaiters.forEach((resolve) => resolve(newToken));
      refreshWaiters = [];

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      forceLogout('expired');
    }

    return Promise.reject(error);
  },
);

export default api;
