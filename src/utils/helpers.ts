import { Platform, Alert, Linking } from 'react-native';
import { COLORS } from './constants';


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
};


export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const showAlert = (title: string, message: string, buttons?: any[]) => {
  Alert.alert(title, message, buttons);
};

export const openURL = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showAlert('Error', `Cannot open URL: ${url}`);
    }
  } catch (error) {
    showAlert('Error', 'Failed to open URL');
  }
};


export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const getStatusBarHeight = (): number => {
  if (isIOS) {
    return 44; // Standard iOS status bar height
  }
  return 24; // Standard Android status bar height
};

export const getBottomTabHeight = (): number => {
  if (isIOS) {
    return 83; // iOS tab bar with safe area
  }
  return 56; // Android bottom navigation
};

// create a function for axios api calls
import axios from 'axios';
export const apiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  token?: string
) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios({
      url: endpoint,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// create a function for handling errors
export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    showAlert('Error', message);
  } else {
    showAlert('Error', 'An unexpected error occurred');
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';
export const setSession = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting session:', error);
  }
};
export const getSession = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error('Error getting session:', error);
  }
  return null;
};
export const removeSession = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing session:', error);
  }
};    
