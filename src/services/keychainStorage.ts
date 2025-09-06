import { StateStorage } from 'zustand/middleware';
import * as keychain from 'react-native-keychain';

interface StoredAuthState {
  token: string | null;
}

export const keychainStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log('[keyChainStorage] Getting Item: ', name);
    try {
      const credentials = await keychain.getGenericPassword();

      const token = credentials ? credentials.password : null;

      const state = {
        token,
      };

      return JSON.stringify({ state });
    } catch (error) {
      console.error('[keyChainStorage] Error getting item: ', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log('[keyChainStorage] Setting Item: ', name);

    try {
      const { state } = JSON.parse(value);
      const { token }: StoredAuthState = state;

      //! store the token in the generic keychain
      if (token === null) {
        await keychain.resetGenericPassword();
      } else {
        await keychain.setGenericPassword('token', token);
      }
    } catch (error) {
      console.error('[keyChainStorage] Error Setting item: ', error);
    }
  },

  removeItem: async (name?: string): Promise<void> => {
    console.log('[keyChainStorage] Removing Item: ', name);
    try {
      await keychain.resetGenericPassword();
    } catch (error) {
      console.error('[keyChainStorage] Error removing item: ', error);
    }
  },
};
