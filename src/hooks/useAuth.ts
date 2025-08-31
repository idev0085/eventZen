import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';
import { requestOtp, verifyOtp } from '../api/authApi';
import { saveToken, removeToken } from '../utils/tokenManager';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define types for navigation
type AuthStackParamList = {
  LoginScreen: undefined;
  EnterLoginOTPScreen: { email: string };
};
type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<AuthNavigationProp>();

  // Mutation to request OTP
  const { mutate: performRequestOtp, isPending: isRequestingOtp } = useMutation(
    {
      mutationFn: requestOtp,
      onSuccess: email => {
        Toast.show('OTP sent to your email!', Toast.LONG);
        navigation.navigate('EnterLoginOTPScreen', {
          email: email.toLowerCase(),
        });
      },
    },
  );

  // Mutation to verify OTP and log in
  const { mutate: performVerifyOtp, isPending: isVerifyingOtp } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: async token => {
      // 1. Save the token securely
      await saveToken(token);
      // 2. Invalidate the 'profile' query. This is the magic key.
      // It tells React Query to refetch the user's profile, which will
      // now succeed with the new token, effectively logging the user in.
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      Toast.show('Login Successful!', Toast.SHORT);
    },
  });

  // Logout function
  const logout = async () => {
    await removeToken();
    // Invalidate the profile to log the user out across the app
    await queryClient.invalidateQueries({ queryKey: ['profile'] });
    Toast.show('Logged out.', Toast.SHORT);
  };

  return {
    performRequestOtp,
    isRequestingOtp,
    performVerifyOtp,
    isVerifyingOtp,
    logout,
  };
};
