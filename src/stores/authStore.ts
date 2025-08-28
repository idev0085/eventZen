import { create } from 'zustand';
import * as keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TUser } from '../schemas/authSchemas';

interface AuthState {
  token: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
  isHydrated: boolean; // To track if we have loaded from storage
  isSessionExpired: boolean;
  setToken: (token: string) => void;
  setUser: (user: TUser) => void;
  logout: () => void;
  hydrate: () => void;
  showSessionExpiredModal: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  isSessionExpired: false,

  setToken: async token => {
    set({ token, isAuthenticated: true });
    await keychain.setGenericPassword('token', token);
  },

  setUser: async user => {
    set({ user });
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

  hydrate: async () => {
    try {
      const credentials = await keychain.getGenericPassword();
      const userString = await AsyncStorage.getItem('user');
      if (credentials && userString) {
        const token = credentials.password;
        const user = JSON.parse(userString);
        set({ token, user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Failed to hydrate auth state: ', error);
    } finally {
      set({ isHydrated: true });
    }
  },
}));
