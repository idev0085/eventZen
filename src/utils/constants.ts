import AddToCalendar from '../../assets/svg/svgComponents/AddToCalendar';
import AlertWithCircle from '../../assets/svg/svgComponents/AlertWithCircle';
import OtpEdit from '../../assets/svg/svgComponents/OtpEdit';
import SocialFacebook from '../../assets/svg/svgComponents/SocialFacebook';
import SocialInstagram from '../../assets/svg/svgComponents/SocialIntagram';
import SocialLinkedin from '../../assets/svg/svgComponents/SocialLinkedin';
import SocialTwitter from '../../assets/svg/svgComponents/SocialTwitter';
import TabHome from '../../assets/svg/svgComponents/TabHome';
import TabSession from '../../assets/svg/svgComponents/TabSession';
import TimerIcon from '../../assets/svg/svgComponents/TimerIcon';
import TimerViewIcon from '../../assets/svg/svgComponents/TimerViewIcon';
import WorkShopView from '../../assets/svg/svgComponents/WorkShopView';
import GreenBadge from '../../assets/svg/svgComponents/GreenBadge';
import EmailPadding from '../../assets/svg/svgComponents/EmailPadding';
import PhonePadding from '../../assets/svg/svgComponents/PhonePadding';
import DrawerProfile from '../../assets/svg/svgComponents/DrawerProfile';
import DrawerArrow from '../../assets/svg/svgComponents/DrawerArrow';
import DrawerMyAgenda from '../../assets/svg/svgComponents/DrawerMyAgenda';
import DrawerHeaderQr from '../../assets/svg/svgComponents/DrawerHeaderQr';
import DrawerLogout from '../../assets/svg/svgComponents/DrawerLogout';
import DrawerFavSession from '../../assets/svg/svgComponents/DrawerFavSession';
import DrawerSpeaker from '../../assets/svg/svgComponents/DrawerSpeaker';
import DrawerExhibitor from '../../assets/svg/svgComponents/DrawerExhibitor';
import DrawerSponsor from '../../assets/svg/svgComponents/DrawerSponsor';
import DrawerHelp from '../../assets/svg/svgComponents/DrawerHelp';
import DrawerAbout from '../../assets/svg/svgComponents/DrawerAbout';
import DrawerLocation from '../../assets/svg/svgComponents/DrawerLocation';
import DrawerPrivacyPolicy from '../../assets/svg/svgComponents/DrawerPrivacy';
import DrawerTermsCondition from '../../assets/svg/svgComponents/DrawerTermsCondition';
import LeftArrowIcon from '../../assets/svg/svgComponents/LeftArrowIcon';
import Search from '../../assets/svg/svgComponents/Search';
import SessionTimeOut from '../../assets/svg/svgComponents/SessionTimeOut';
import Timer from '../../assets/svg/svgComponents/Timer';
import TabConnection from '../../assets/svg/svgComponents/TabConnection';
import TabHomeActive from '../../assets/svg/svgComponents/TabHomeActive';
import TabSessionActive from '../../assets/svg/svgComponents/TabSessionActive';
import TabConnectionActive from '../../assets/svg/svgComponents/TabConnectionActive';
import TimerWait from '../../assets/svg/svgComponents/TimerWait';
import Calander from '../../assets/svg/svgComponents/Calander';
import Location from '../../assets/svg/svgComponents/Location';
import Workshop from '../../assets/svg/svgComponents/Workshop';
import SessionUpcoming from '../../assets/svg/svgComponents/SessionUpcoming';
import SessionCompleted from '../../assets/svg/svgComponents/SessionCompleted';
import DrawerMenuIcon from '../../assets/svg/svgComponents/DrawerMenuIcon';
import NotificationBellIcon from '../../assets/svg/svgComponents/NotificationBellIcon';
import AttendeeIcon from '../../assets/svg/svgComponents/AttendeeIcon';
import ExhibitorsIcon from '../../assets/svg/svgComponents/ExhibitorsIcon';
import SpeakersIcon from '../../assets/svg/svgComponents/SpeakersIcon';
import SponsorsIcon from '../../assets/svg/svgComponents/SponsorsIcon';
import EditProfileIcon from '../../assets/svg/svgComponents/EditProfile';
import PartyPopperIcon from '../../assets/svg/svgComponents/PartyPopperIcon';
import NetworkFilledIcon from '../../assets/svg/svgComponents/NetworkFilledIcon';
import CalendarFilledIcon from '../../assets/svg/svgComponents/CalendarFilledIcon';
import FavoriteFilledIcon from '../../assets/svg/svgComponents/FavoriteFilledIcon';
import ScannerActionIcon from '../../assets/svg/svgComponents/ScannerActionIcon';
import ArrowLeftIcon from '../../assets/svg/svgComponents/ArrowLeftIcon';
import OtpImageBackground from '../../assets/svg/svgComponents/OtpImageBackground';
import Download from '../../assets/svg/svgComponents/Download';
import OpenScannerIcon from '../../assets/svg/svgComponents/OpenScannerIcon';
import Level from '../../assets/svg/svgComponents/Level';
export const APP_CONFIG = {
  name: 'EventZen',
  version: '1.0.0',
  buildNumber: 1,
  DEBUG: false,
  TOKEN: 'authToken',
  RESEND_TIMER: 60,
};

export const COLORS = {
  primary: '#004FB8',
  secondary: '#0E69E3',
  textBoxPrimary: '#F5F5F5',
  textBoxSecondary: '#B8B8B8',
  textInputPrimary: '#D8D8D8',
  surface: '#FFFFFF',
  error: '#EF4444',
  logoutError: '#FF0000',
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
  qrBox: '#4d8bff',
  eventTimeBox: '#1261CC',
  badgeGreen: '#e8f2ee',
  badgeYellow: '#fef5e8',
  tinyDot: '##7C7C7C',
  bronze: '#CD7F32',
};

export const TEXT_SIZES = {
  xxs: 10, // extra extra small
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

export const GENERATED_CONNECTIONS = [
  {
    id: 'user-1',
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  {
    id: 'user-2',
    imageUrl:
      'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  {
    id: 'user-3',
    imageUrl:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
  },
  {
    id: 'user-4',
    imageUrl:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 'user-5',
    imageUrl:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  {
    id: 'user-6',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 'user-7',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.eventzen.com',
  AUTH: '/auth',
  USER: '/user',
  REQUEST_TIMEOUT: 15000,
};

export const CONFIG = {};

export const PNG_IMAGES = {
  LoginBg: require('../../assets/images/background.png'),
  ProfileBg: require('../../assets/images/profile_bg.png'),
  OtpBg: require('../../assets/images/otp_bg.png'),
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
  OtpEdit,
  GreenBadge,
  EmailPadding,
  PhonePadding,
  DrawerProfile,
  DrawerArrow,
  DrawerMyAgenda,
  DrawerHeaderQr,
  DrawerLogout,
  DrawerFavSession,
  DrawerSpeaker,
  DrawerExhibitor,
  DrawerSponsor,
  DrawerHelp,
  DrawerAbout,
  DrawerLocation,
  DrawerPrivacyPolicy,
  DrawerTermsCondition,
  LeftArrowIcon,
  Search,
  SessionTimeOut,
  Timer,
  TabConnection,
  TabHomeActive,
  TabSessionActive,
  TabConnectionActive,
  TimerWait,
  Calander,
  Location,
  Workshop,
  SessionUpcoming,
  SessionCompleted,
  DrawerMenuIcon,
  NotificationBellIcon,
  AttendeeIcon,
  ExhibitorsIcon,
  SpeakersIcon,
  SponsorsIcon,
  EditProfileIcon,
  PartyPopperIcon,
  NetworkFilledIcon,
  CalendarFilledIcon,
  FavoriteFilledIcon,
  ScannerActionIcon,
  ArrowLeftIcon,
  OtpImageBackground,
  Download,
  OpenScannerIcon,
  Level
};
