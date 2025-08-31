// useSession.ts - SIMPLIFIED VERSION
import { useEffect, useState } from 'react';
import { getToken } from '../utils/tokenManager';

export const useSession = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate token on mount
  useEffect(() => {
    const hydrateToken = async () => {
      try {
        console.log('🔄 Checking authentication...');
        const storedToken = await getToken();
        console.log('📦 Token from storage:', storedToken ? 'Exists' : 'None');
        setToken(storedToken);
      } catch (error) {
        console.error('❌ Failed to get token:', error);
        setToken(null);
      } finally {
        console.log('✅ Auth check complete');
        setIsHydrated(true);
      }
    };

    hydrateToken();
  }, []);

  const isAuthenticated = !!token;
  const isLoading = !isHydrated;

  console.log('🔐 Session state:', {
    isAuthenticated,
    isLoading,
    hasToken: !!token,
    isHydrated,
  });

  return {
    user: null, // Temporary - remove React Query for now
    token,
    isAuthenticated,
    isLoading,
    isError: false,
    isHydrated,
  };
};
