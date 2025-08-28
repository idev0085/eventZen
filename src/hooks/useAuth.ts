import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verifyOtp } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import Toast from 'react-native-simple-toast';

export const useAuth = () => {
  const { setToken } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: performLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: token => {
      // 1. Token received, store it immediately.
      setToken(token);
      Toast.show('Login successful!', Toast.SHORT);

      // 2. Invalidate any old queries and prepare to fetch fresh data.
      // This is good practice to clear out any stale data from a previous session.
      queryClient.invalidateQueries();
    },
    // Global onError in QueryClient will handle the toast message
  });

  return { performLogin, isLoggingIn };
};
