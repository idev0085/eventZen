import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@tanstack/react-query';
import { requestOtp } from '../api/authApi';
import Toast from 'react-native-simple-toast';

type AuthStackParamList = {
  LoginScreen: undefined;
  EnterLoginOTPScreen: { email: string };
};

type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;

export const useRequestOtp = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  const { mutate: performRequestOtp, isPending: isRequestingOtp } = useMutation(
    {
      mutationFn: requestOtp,
      onSuccess: email => {
        Toast.show('OTP sent to your email', Toast.LONG);
        navigation.navigate('EnterLoginOTPScreen', {
          email,
        });
      },
    },
  );
  return { performRequestOtp, isRequestingOtp };
};
