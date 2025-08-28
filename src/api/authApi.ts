// src/api/authApi.ts
import {
  VerifyOtpResponseSchema,
  UserProfileResponseSchema,
  TUser,
} from '../schemas/authSchemas';
import { apiClient } from './apiClient';

interface OtpPayload {
  email: string;
  otp: string;
}

export const verifyOtp = async (payload: OtpPayload): Promise<string> => {
  const { data } = await apiClient.post('/auth/verify-otp', payload);
  const validatedData = VerifyOtpResponseSchema.parse(data);
  return validatedData.token;
};

export const getProfile = async (): Promise<TUser> => {
  const { data } = await apiClient.get('/profile');
  const validatedData = UserProfileResponseSchema.parse(data);
  return validatedData.data.user;
};
