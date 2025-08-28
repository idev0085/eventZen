// src/hooks/useProfile.ts
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import { useEffect } from 'react'; // <-- Import useEffect

export const useProfile = () => {
  const { isAuthenticated, setUser } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    setUser: state.setUser,
  }));

  // 1. The useQuery hook now only focuses on fetching data.
  const { data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });

  // 2. We use useEffect to run a side effect (updating Zustand) when the query successfully returns data.
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data, setUser]);

  // You can return the original query result if components need it
  return { data, isSuccess };
};
