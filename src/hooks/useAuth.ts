import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';
import { requestOtp, verifyOtp } from '../api/authApi';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from '../stores/authStore';

type AuthStackParamList = {
  EnterLoginOTPScreen: { email: string };
};
type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;

export const useAuth = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const queryClient = useQueryClient();

  const logoutAction = useAuthStore(state => state.logout);

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
    onSuccess: () => {
      Toast.show('Login Successful!', Toast.SHORT);
    },
    onError: error => {
      console.error('❌ OTP verification failed:', error);
      // The global handler in queryClient will show a toast.
    },
  });

  // Logout function - COMPLETE FIX
  const logout = () => {
    console.log('🚪 Kicking off logout...');
    try {
      logoutAction();
      Toast.show('Logged out successfully.', Toast.SHORT);
      // Navigation will automatically redirect because `isAuthenticated` becomes false.
    } catch (error) {
      console.error('❌ Logout failed:', error);
      Toast.show('Logout failed. Please try again.', Toast.LONG);
    }
  };

  return {
    performRequestOtp,
    isRequestingOtp,
    performVerifyOtp,
    isVerifyingOtp,
    logout,
  };
};
