// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { getLocales } from 'react-native-localize';

// const resources = {
//   en: {
//     translation: {
//       // Onboarding
//       'onboarding.skip': 'Skip',
//       'onboarding.continue': 'Continue',
//       'onboarding.getStarted': 'Get Started',
//       'onboarding.signInGoogle': 'Sign in with Google',
//       'onboarding.signInApple': 'Sign in with Apple',
//       'onboarding.continueGuest': 'Continue as Guest',
      
//       // Home
//       'home.greeting': 'Good morning!',
//       'home.subtitle': 'Create amazing ringtones',
//       'home.searchPlaceholder': 'Search ringtones...',
//       'home.categories': 'Categories',
//       'home.recentCreations': 'Recent Creations',
//       'home.seeAll': 'See All',
//       'home.quickActions': 'Quick Actions',
//       'home.importAudio': 'Import Audio',
//       'home.recordAudio': 'Record Audio',
      
//       // Import
//       'import.title': 'Import & Create',
//       'import.subtitle': 'Add audio files or record new content',
//       'import.importOptions': 'Import Options',
//       'import.importAudio': 'Import Audio File',
//       'import.importVideo': 'Import Video File',
//       'import.recordAudio': 'Record Audio',
//       'import.musicLibrary': 'Music Library',
//       'import.recentImports': 'Recent Imports',
//       'import.manageFiles': 'Manage Files',
//       'import.tips': 'Tips & Guidelines',
//       'import.bestPractices': 'Best Practices',
      
//       // Editor
//       'editor.title': 'Audio Editor',
//       'editor.waveform': 'Waveform',
//       'editor.editingTools': 'Editing Tools',
//       'editor.audioEffects': 'Audio Effects',
//       'editor.exportRingtone': 'Export Ringtone',
//       'editor.trim': 'Trim',
//       'editor.copy': 'Copy',
//       'editor.volume': 'Volume',
//       'editor.speed': 'Speed',
      
//       // Settings
//       'settings.title': 'Settings',
//       'settings.subtitle': 'Customize your experience',
//       'settings.account': 'Account',
//       'settings.preferences': 'Preferences',
//       'settings.support': 'Support',
//       'settings.storage': 'Storage',
//       'settings.signOut': 'Sign Out',
//       'settings.version': 'Version',
      
//       // Common
//       'common.cancel': 'Cancel',
//       'common.ok': 'OK',
//       'common.save': 'Save',
//       'common.delete': 'Delete',
//       'common.rename': 'Rename',
//       'common.share': 'Share',
//       'common.favorite': 'Favorite',
//       'common.play': 'Play',
//       'common.pause': 'Pause',
//       'common.stop': 'Stop',
//       'common.loading': 'Loading...',
//       'common.error': 'Error',
//       'common.success': 'Success',
//     },
//   },
//   es: {
//     translation: {
//       // Spanish translations
//       'onboarding.skip': 'Omitir',
//       'onboarding.continue': 'Continuar',
//       'onboarding.getStarted': 'Comenzar',
//       'home.greeting': '¡Buenos días!',
//       'home.subtitle': 'Crea tonos increíbles',
//       // ... more Spanish translations
//     },
//   },
//   fr: {
//     translation: {
//       // French translations
//       'onboarding.skip': 'Passer',
//       'onboarding.continue': 'Continuer',
//       'onboarding.getStarted': 'Commencer',
//       'home.greeting': 'Bonjour!',
//       'home.subtitle': 'Créez des sonneries incroyables',
//       // ... more French translations
//     },
//   },
// };

// const initI18n = () => {
//   const locales = getLocales();
//   const deviceLanguage = locales[0]?.languageCode || 'en';

//   i18n
//     .use(initReactI18next)
//     .init({
//       resources,
//       lng: deviceLanguage,
//       fallbackLng: 'en',
//       interpolation: {
//         escapeValue: false,
//       },
//     });

//   return i18n;
// };

// export default initI18n;
// export { i18n };