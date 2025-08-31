import * as Keychain from 'react-native-keychain';
import { APP_CONFIG } from './constants';

const TOKEN_KEY = APP_CONFIG.TOKEN;

export const saveToken = async (token: string): Promise<void> => {
  await Keychain.setGenericPassword(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  await Keychain.resetGenericPassword();
};
