import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TUser } from '../schemas/authSchemas';
import { keychainStorage } from '../services/keychainStorage';
import { getProfile } from '../api/authApi';
import { queryClient } from '../../App';

interface AuthState {
  token: string | null;
  user: TUser | null;
  status: 'hydrating' | 'ready' | 'idle';
  isSessionExpired: boolean;
}

interface AuthActions {
  setToken: (token: string) => Promise<void>;
  setUser: (user: TUser) => void;
  logout: () => void;
}

const initialState: AuthState = {
  token: null,
  user: null,
  status: 'idle',
  isSessionExpired: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      status: 'hydrating',

      // --- ACTIONS ---
      setToken: async (token: string) => {
        console.log('🔑 Setting new token and fetching profile...');
        set({ token, status: 'ready' });
        try {
          const userProfile = await getProfile();
          set({ user: userProfile });
          console.log('👤 User profile fetched and set!');
        } catch (error) {
          console.error('Failed to fetch profile after login', error);

          get().logout();
        }
      },

      setUser: (user: TUser) => {
        if (JSON.stringify(get().user) !== JSON.stringify(user)) {
          set({ user });
        }
      },

      logout: () => {
        console.log('🚪 Logging out and resetting state...');
        queryClient.clear();
        set({ ...initialState, status: 'ready' });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => keychainStorage),
      partialize: state => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => state => {
        console.log('🔄 Hydration from storage complete.');
        if (state) {
          state.status = 'ready';
        }
      },
    },
  ),
);

export const useIsAuthenticated = () => useAuthStore(state => !!state.token);
export const useAuthIsReady = () =>
  useAuthStore(state => state.status === 'ready');
