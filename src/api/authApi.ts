import {
  VerifyOtpResponseSchema,
  UserProfileResponseSchema,
  TUser,
  RequestOtpResponseSchema,
} from '../schemas/authSchemas';
import { useAuthStore } from '../stores/authStore';
import { apiClient } from './apiClient';
import Toast from 'react-native-simple-toast';

export type TUpdateProfilePayload = {
  first_name: string;
  last_name: string;
  designation: string;
  company_name: string | null;
  company_website: string | null;
  email: string;
  phone: string;
  bio: string;
  tags: string;
};
interface OtpPayload {
  email: string;
  otp: string;
}

export const requestOtp = async (payload: {
  email: string;
}): Promise<string> => {
  const { data } = await apiClient.post('/api/auth/login', payload);
  const validateData = RequestOtpResponseSchema.parse(data);

  if (__DEV__) {
    console.log(
      `DEV ONLY: OTP for ${validateData.data.email} is ${validateData.data.otp}`,
    );
    Toast.show(`OTP: ${validateData.data.otp}`, Toast.LONG);
  }

  return validateData.data.email;
};

export const verifyOtp = async (payload: OtpPayload): Promise<string> => {
  const { data } = await apiClient.post('/api/auth/verify-otp', payload);
  const validatedData = VerifyOtpResponseSchema.parse(data);

  const token = validatedData.token;
  if (token) {
    await useAuthStore.getState().setToken(token);
    try {
      const userProfile = await getProfile();
      useAuthStore.getState().setUser(userProfile);
    } catch (error) {
      console.error(
        'Error occured while fetching the getProfile after login',
        error,
      );
    }
  }
  return token;
};

export const getProfile = async (): Promise<TUser> => {
  const { data } = await apiClient.get('/api/profile');
  const validated = UserProfileResponseSchema.parse(data);
  return validated;
};

// UPDATE PROFILE API

export const updateProfile = async (payload: TUpdateProfilePayload) => {
  const { data } = await apiClient.put('/api/profile', payload);
  return data;
};

// FETCH HOME Screen DATA API
export const getHomeData = async () => {
  const { data } = await apiClient.post('/api/home');
  return data;
};

// FETCH TAGS DATA API
export const getTags = async () => {
  const { data } = await apiClient.get('/api/tags');
  return data.data || data;
};

// FETCH TAGS DATA API
export const getSessions = async () => {
  const { data } = await apiClient.get('/api/sessions');
  return data.data || data;
};
// FETCH TAGS DATA API
export const getConnections = async () => {
  const { data } = await apiClient.get('/api/connections');
  return data.data || data;
};
