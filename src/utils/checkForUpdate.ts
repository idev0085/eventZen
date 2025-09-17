import VersionCheck from 'react-native-version-check';
import { APP_CONFIG } from './constants';
import { Alert, Linking, Platform } from 'react-native';

export const checkForUpdates = async () => {
  const playStoreURL = `${APP_CONFIG.PLAYSTORE_URL}?id=${APP_CONFIG.ANDROID_PACKAGE_NAME}`;
  let latestVersion = '0';

  try {
    latestVersion = await VersionCheck.getLatestVersion({
      provider: Platform.OS === 'android' ? 'playStore' : 'appStore',
      packageName:
        Platform.OS === 'android' ? APP_CONFIG.ANDROID_PACKAGE_NAME : '',
    });
  } catch (err) {
    console.log('Failed to fetch the latest version of the app', err);
  }

  // Check for the current version that user has
  const currentVersion = VersionCheck.getCurrentVersion();

  if (latestVersion > currentVersion) {
    Alert.alert(
      'Update Available',
      'A new version of the app is available. Please update to the latest version.',
      [
        {
          text: 'Update',
          onPress: () => Linking.openURL(playStoreURL),
        },
      ],
    );
  }
};
