import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../config';
import { useAuthStore } from '../stores/authStore';
import { API_ENDPOINTS } from '../utils/constants';
import { removeToken } from '../utils/tokenManager';
import { queryClient } from '../../App';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: API_ENDPOINTS.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const PUBLIC_URLs = ['/auth/login', '/auth/verify-otp', '/auth/resend-otp'];

// Request Interceptor: The gatekeeper for all authenticated calls
apiClient.interceptors.request.use(
  async config => {
    const { token } = useAuthStore.getState();
    const isPublicUrl = PUBLIC_URLs.some(url => config.url?.startsWith(url));

    if (isPublicUrl || !token) {
      return config;
    }

    config.headers.Authorization = `Bearer ${token}`;

    try {
      console.log('Checking session...');
      await apiClient.get('/auth/check-session', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Session is valid. Proceeding with original request.');
      return config; // Session is valid, proceed with the original request
    } catch (sessionError) {
      Toast.show('Session expired. Please log in again.', Toast.LONG);
      // If session check fails, log out the user
      await removeToken();
      // Invalidate the profile query to signal logout across the app
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      return Promise.reject(new axios.Cancel('Session validation failed.'));
    }
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    // If the request was cancelled by our interceptor, don't show a generic error
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const { response } = error;
    const errorMessage =
      response?.data?.message || 'An unexpected error occurred.';
    Toast.show(errorMessage, Toast.LONG);

    return Promise.reject(error);
  },
);
