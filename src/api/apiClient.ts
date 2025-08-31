import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../config';
import { API_ENDPOINTS } from '../utils/constants';
import { getToken, removeToken } from '../utils/tokenManager';
import { queryClient } from '../../App';

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
      const token = await getToken();
      const isPublicUrl = PUBLIC_URLs.some(url => config.url?.includes(url));

      if (isPublicUrl || !token) {
        return config;
      }

      config.headers.Authorization = `Bearer ${token}`;
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
    console.log('API Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.status,
      config: error.config?.url,
    });

    // Network error (no response)
    if (!error.response) {
      Toast.show('Network error. Please check your connection.', Toast.LONG);
      return Promise.reject(error);
    }

    // Session expired error
    if (error.response.status === 401) {
      Toast.show('Session expired. Please log in again.', Toast.LONG);
      await removeToken();
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
