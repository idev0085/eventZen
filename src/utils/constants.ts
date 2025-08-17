import AddToCalendar from '../../assets/svg/svgComponents/AddToCalendar';
import AlertWithCircle from '../../assets/svg/svgComponents/AlertWithCircle';
import OtpCenter from '../../assets/svg/svgComponents/OtpCenter';
import SocialFacebook from '../../assets/svg/svgComponents/SocialFacebook';
import SocialInstagram from '../../assets/svg/svgComponents/SocialIntagram';
import SocialLinkedin from '../../assets/svg/svgComponents/SocialLinkedin';
import SocialTwitter from '../../assets/svg/svgComponents/SocialTwitter';
import TabHome from '../../assets/svg/svgComponents/TabHome';
import TabSession from '../../assets/svg/svgComponents/TabSession';
import TimerIcon from '../../assets/svg/svgComponents/TimerIcon';
import TimerViewIcon from '../../assets/svg/svgComponents/TimerViewIcon';
import WorkShopView from '../../assets/svg/svgComponents/WorkShopView';

export const APP_CONFIG = {
  name: 'EventZen',
  version: '1.0.0',
  buildNumber: 1,
};

export const COLORS = {
  primary: '#004FB8',
  secondary: '#0E69E3',
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

export const TEXT_SIZES = {
  xs: 12, // Extra Small
  sm: 14, // Small
  md: 16, // Medium (often a good default for body text)
  lg: 18, // Large
  xl: 20, // Extra Large
  '2xl': 24, // 2x Extra Large
  '3xl': 30, // 3x Extra Large (e.g., for section titles)
  '4xl': 36, // 4x Extra Large (e.g., for large headings)
  '5xl': 48, // 5x Extra Large (e.g., for very large display text)
};

export const SPACING = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999, // For perfectly round elements
};

export const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
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
  USER: '/user',
};

export const PNG_IMAGES = {
  LoginBg: require('../../assets/images/background.png'),
};

// react-native svg components
export {
  AddToCalendar,
  AlertWithCircle,
  SocialFacebook,
  SocialInstagram,
  SocialLinkedin,
  SocialTwitter,
  TabSession,
  TabHome,
  TimerIcon,
  TimerViewIcon,
  WorkShopView,
  OtpCenter,
};
