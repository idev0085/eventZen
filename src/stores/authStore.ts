import { create } from 'zustand';
import * as keychain from 'react-native-keychain';
import { TUser } from '../schemas/authSchemas';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  isHydrated: boolean;
  isSessionExpired: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  setToken: (token: string) => Promise<void>;
  hydrate: () => Promise<void>;
  showSessionExpiredModal: () => void;
  logout: () => Promise<void>;
  setUser: (user: TUser) => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  isSessionExpired: false,

  setToken: async (token: string) => {
    set({ token, isAuthenticated: true });
    await keychain.setGenericPassword('token', token);
  },

  setUser: async (user: TUser) => {
    const currentUser = useAuthStore.getState().user;
    if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
      set({ user });
      await AsyncStorage.setItem('user', JSON.stringify(user));
    }
  },

  clearToken: async () => {
    set({ token: null });
    await keychain.resetGenericPassword();
  },

  logout: async () => {
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isSessionExpired: false,
    });
    await keychain.resetGenericPassword();
    await AsyncStorage.removeItem('user');
  },

  showSessionExpiredModal: () => set({ isSessionExpired: true }),
  hideSessionExpiredModal: () => set({ isSessionExpired: false }),

  hydrate: async () => {
    console.log('Hydrate called');
    try {
      const credentials = await keychain.getGenericPassword();
      // const userString = await AsyncStorage.getItem('user');
      if (credentials) {
        const token = credentials.password;
        // const user = JSON.parse(userString);
        set({ token, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Failed to hydrate auth state: ', error);
    } finally {
      set({ isHydrated: true });
    }
  },
}));
