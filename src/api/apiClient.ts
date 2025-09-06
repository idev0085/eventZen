import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../config';
import { API_ENDPOINTS } from '../utils/constants';
import { queryClient } from '../../App';
import { useAuthStore } from '../stores/authStore';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: API_ENDPOINTS.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const PUBLIC_URLs = [
  '/auth/login',
  '/auth/verify-otp',
  '/auth/resend-otp',
  '/auth/check-session',
];

// Request Interceptor
apiClient.interceptors.request.use(
  async config => {
    try {
      const token = await useAuthStore.getState().token;
      const isPublicUrl = PUBLIC_URLs.some(url => config.url?.includes(url));

      if (token && !isPublicUrl) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  },
  error => {
    console.error('Request interceptor setup error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor: FIXED PROPERLY
apiClient.interceptors.response.use(
  response => {
    console.log('API Success:', response.config.url);
    return response;
  },
  async error => {
    const originalRequest = error.config;
    console.log('API Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.status,
      url: originalRequest?.url,
    });

    // Network error (no response)
    if (!error.response) {
      Toast.show('Network error. Please check your connection.', Toast.LONG);
      return Promise.reject(error);
    }

    // Session expired error
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Session expired or token is invalid. Logging out.');
      Toast.show('Session expired. Please log in again.', Toast.LONG);

      useAuthStore.getState().logout();
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    } else {
      // Other server errors
      const errorMessage =
        error.response.data?.message || 'An unexpected error occurred.';
      Toast.show(errorMessage, Toast.LONG);
    }

    return Promise.reject(error);
  },
);
