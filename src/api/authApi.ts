// src/api/authApi.ts
import {
  VerifyOtpResponseSchema,
  UserProfileResponseSchema,
  TUser,
  RequestOtpResponseSchema,
} from '../schemas/authSchemas';
import { apiClient } from './apiClient';
import Toast from 'react-native-simple-toast';
interface OtpPayload {
  email: string;
  otp: string;
}

export const requestOtp = async (payload: {
  email: string;
}): Promise<string> => {
  const { data } = await apiClient.post('/auth/login', payload);
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
  const { data } = await apiClient.post('/auth/verify-otp', payload);
  const validatedData = VerifyOtpResponseSchema.parse(data);
  return validatedData.token;
};

export const getProfile = async (): Promise<TUser> => {
  try {
    const { data } = await apiClient.get('/profile');
    const validated = UserProfileResponseSchema.parse(data);
    return validated.data.user;
  } catch (error) {
    // If getProfile fails for any reason (401, network error), we throw
    // This will put the useQuery hook into an `isError` state.
    throw new Error('Failed to fetch profile.');
  }
};
