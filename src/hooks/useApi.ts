import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getHomeData,
  getProfile,
  getTags,
  TUpdateProfilePayload,
  updateProfile,
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
