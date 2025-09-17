import { Alert } from 'react-native';
import {
  VerifyOtpResponseSchema,
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
  tag: string;
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
  return data;
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

// FETCH SESSION USING SESSION ID
export const getSessionDetailsById = async (sessionId: string | number) => {
  console.log(`🚀 Fetching details for session ID: ${sessionId}`);

  const { data } = await apiClient.get(`/api/sessions/${sessionId}`);
  return data;
};

// FETCH CONNECTION USING CONNECTION ID
export const getConnectionDetailsById = async (
  connectionId: string | number,
) => {
  console.log(`🚀 Fetching details for session ID: ${connectionId}`);
  const { data } = await apiClient.get(`/api/connections/${connectionId}`);
  return data;
};

export const getAttedees = async () => {
  const { data } = await apiClient.get('/api/attendees');
  return data.data || data;
};

export const getAttedeesDetailsById = async (userId: string | number) => {
  const { data } = await apiClient.get(`/api/attendees/${userId}`);
  return data[0];
};

export const getSpeakers = async () => {
  const { data } = await apiClient.get('/api/speakers');
  return data.data || data;
};

export const getSpeakersDetailsById = async (userId: string | number) => {
  const { data } = await apiClient.get(`/api/speakers/${userId}`);
  return data[0];
};

export const addOneSignal = async (obj: object) => {
  console.log('OneSignal update payload:', obj);
  const { data } = await apiClient.post('/api/onesignal', obj);
  return data;
};

export const uploadAvatar = async (file: {
  uri: string;
  type: string;
  name: string;
}) => {
  const formData = new FormData();
  formData.append('image', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);

  const { data } = await apiClient.post('/api/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};


export const getExhibitors = async () => {
  const { data } = await apiClient.get('/api/exhibitors');
  return data.data || data;
}

export const getSponsors = async () => {
  const { data } = await apiClient.get('/api/sponsors');
  return data.data || data;
}

export const getExhibitorById = async (exhibitorId: string | number) => {
  const { data } = await apiClient.get(`/api/exhibitors/${exhibitorId}`);
  return data?.data || data;  
}

export const getSponsorById = async (sponsorId: string | number) => {
  const { data } = await apiClient.get(`/api/sponsors/${sponsorId}`);
  return data?.data || data;
}