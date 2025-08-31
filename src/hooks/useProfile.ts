import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import { useEffect } from 'react';

export const useProfile = () => {
  // Select ONLY the primitive value that controls the query's enabled state.
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  // Get the setter function outside of the React render cycle.
  // This reference is stable and won't change.
  const setUser = useAuthStore.getState().setUser;

  const { data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });

  // This is the critical fix for the loop.
  // This useEffect will now ONLY run when `isSuccess` becomes true or when `data.id` changes.
  // Since `data.id` is stable for a logged-in user, this effect effectively runs only ONCE
  // per successful fetch, which is exactly what we want.
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data?.id, setUser]); // Using data.id makes the dependency stable

  // Return the query result for any component that might need it directly
  return { data, isSuccess };
};
