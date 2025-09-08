import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import {
  getHomeData,
  getProfile,
  getTags,
  TUpdateProfilePayload,
  updateProfile,
} from '../api/authApi';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { useEffect } from 'react';

// Profile hooks
export const useProfile = async () => {
  const setUser = useAuthStore(state => state.setUser);

  const { data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: await getProfile,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log('Data is available:', data);
      setUser;
    }
  }, [data, isSuccess]);
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
