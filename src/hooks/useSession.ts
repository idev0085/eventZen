import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/authApi';

export const useSession = () => {
  const {
    data: user,
    status,
    isSuccess,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: false, // Don't retry on auth errors
    staleTime: Infinity, // Profile data is stable
  });

  return {
    user,
    status,
    isAuthenticated: isSuccess, // The new source of truth!
    isLoading: isPending,
    isError,
  };
};
