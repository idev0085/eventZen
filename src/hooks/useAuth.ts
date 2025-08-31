import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';
import { requestOtp, verifyOtp } from '../api/authApi';
import { saveToken, removeToken } from '../utils/tokenManager';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
      console.log('🔑 OTP verified, saving token...');

      // 1. Save the token securely
      await saveToken(token);
      console.log('✅ Token saved');

      // 2. COMPLETELY RESET QUERY CLIENT
      queryClient.clear();

      // 3. MANUALLY NAVIGATE TO HOME SCREEN
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'App' }],
        }),
      );

      Toast.show('Login Successful!', Toast.SHORT);
    },
    onError: error => {
      console.error('❌ OTP verification failed:', error);
      Toast.show('Login failed. Please try again.', Toast.LONG);
    },
  });

  // Logout function - COMPLETE FIX
  const logout = async () => {
    console.log('🚪 Logging out...');

    try {
      // 1. Remove token from storage
      await removeToken();
      console.log('✅ Token removed from storage');

      // 2. COMPLETELY CLEAR REACT QUERY CACHE
      queryClient.clear();
      queryClient.removeQueries();
      queryClient.cancelQueries();

      // 3. RESET ALL QUERY DATA
      queryClient.setQueryData(['profile'], null);

      // 4. MANUALLY NAVIGATE TO LOGIN SCREEN
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        }),
      );

      console.log('✅ Logout completed successfully');
      Toast.show('Logged out successfully.', Toast.SHORT);
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
