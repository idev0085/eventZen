import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getConnectionDetailsById,
  getConnections,
  getHomeData,
  getProfile,
  getSessionDetailsById,
  getSessions,
  getTags,
  TUpdateProfilePayload,
  updateProfile,
  getAttedees,
  getAttedeesDetailsById,
  getSpeakers,
  getSpeakersDetailsById,
  addOneSignal,
  uploadAvatar,
} from '../api/authApi';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

// Profile hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5, // 5 mints
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (updatedData: TUpdateProfilePayload) =>
      updateProfile(updatedData),
    onSuccess: () => {
      Toast.show('Profile updated successfully!', Toast.LONG);
      console.log('✅ Profile updated! Invalidating cache to refetch...');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigation.goBack();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Update failed!';
      Toast.show(String(message), Toast.LONG);
    },
  });
};

export const useHomeData = () => {
  return useQuery({
    queryKey: ['homeData'],
    queryFn: getHomeData,
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
};

export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });
};

export const useConnections = () => {
  return useQuery({
    queryKey: ['connections'],
    queryFn: getConnections,
  });
};

export const useSessionDetails = (sessionId: string | number) => {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getSessionDetailsById(sessionId),
    enabled: !!sessionId,
  });
};

export const useConnectionDetails = (connectionId: string | number) => {
  return useQuery({
    queryKey: ['connection', connectionId],
    queryFn: () => getConnectionDetailsById(connectionId),
    enabled: !!connectionId,
  });
};

export const useAttendees = () => {
  return useQuery({
    queryKey: ['attendees'],
    queryFn: getAttedees,
  });
};

export const useAttendeeDetails = (userId: string | number) => {
  return useQuery({
    queryKey: ['attendee', userId],
    queryFn: () => getAttedeesDetailsById(userId),
    enabled: !!userId,
  });
};

export const useSpeakers = () => {
  return useQuery({
    queryKey: ['speakers'],
    queryFn: getSpeakers,
  });
};
export const useSpeakerDetails = (userId: string | number) => {
  return useQuery({
    queryKey: ['speaker', userId],
    queryFn: () => getSpeakersDetailsById(userId),
    enabled: !!userId,
  });
};

export const useUpdateOneSignal = (obj: object) => {
  console.log('useApi - useUpdateOneSignal called with:', obj);
  return useQuery({
    queryKey: ['onesignal', obj],
    queryFn: () => addOneSignal(obj),
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      Toast.show('Profile picture updated successfully!', Toast.LONG);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to upload profile picture';
      Toast.show(String(message), Toast.LONG);
    },
  });
};
