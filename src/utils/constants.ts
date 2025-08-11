export const APP_CONFIG = {
  name: 'EventZen',
  version: '1.0.0',
  buildNumber: 1,
};
export const COLORS = {
  primary: '#004FB8',
  textBoxPrimary: '#F5F5F5',
  textBoxSecondary: '#B8B8B8',
  surface: '#FFFFFF',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  textPrimary: '#4E4E4E',
  textSecondary: '#B8B8B8',
  border: '#E5E7EB',
  black: '#000000',
  white: '#FFFFFF',
  icon: '#6B7280',
  background: '#F3F4F6',
  text: '#1F2937',
  textLight: '#9CA3AF',
  placeholder: '#D1D5DB',
};

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  AUDIO_FILES: 'audio_files',
  PROJECTS: 'audio_projects',
  FAVORITES: 'favorite_files',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  USER_SESSION: 'user_session',
};

export const PERMISSIONS = {
  ANDROID: {
    READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
    WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
    WRITE_SETTINGS: 'android.permission.WRITE_SETTINGS',
    POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',
  },
  IOS: {
    CAMERA: 'ios.permission.CAMERA',
    PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
    NOTIFICATIONS: 'ios.permission.NOTIFICATIONS',
  },
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.eventzen.com',
  AUTH: '/auth',
  USER: '/user'
};