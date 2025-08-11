import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS, check, requestNotifications, checkNotifications } from 'react-native-permissions';

export class PermissionService {
  static async requestStoragePermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          const readPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
          );
          return readPermission === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const readPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
          const writePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          return (
            readPermission === PermissionsAndroid.RESULTS.GRANTED &&
            writePermission === PermissionsAndroid.RESULTS.GRANTED
          );
        }
      } else {
        return true;
      }
    } catch (error) {
      console.log('Storage permission error:', error);
      return false;
    }
  }

  static async requestMicrophonePermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        return permission === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const permission = await request(PERMISSIONS.IOS.MICROPHONE);
        return permission === RESULTS.GRANTED;
      }
    } catch (error) {
      console.log('Microphone permission error:', error);
      return false;
    }
  }

  static async requestCameraPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return permission === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const permission = await request(PERMISSIONS.IOS.CAMERA);
        return permission === RESULTS.GRANTED;
      }
    } catch (error) {
      console.log('Camera permission error:', error);
      return false;
    }
  }

  static async requestNotificationPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          return permission === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
      } else {
        const { status } = await requestNotifications(['alert', 'sound', 'badge']);
        return status === RESULTS.GRANTED;
      }
    } catch (error) {
      console.log('Notification permission error:', error);
      return false;
    }
  }

  static async checkPermissionStatus(permissionType: string): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        switch (permissionType) {
          case 'microphone':
            return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
          case 'storage':
            if (Platform.Version >= 33) {
              return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO);
            } else {
              return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            }
          case 'camera':
            return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
          case 'notifications':
            if (Platform.Version >= 33) {
              return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            }
            return true;
          default:
            return false;
        }
      } else {
        switch (permissionType) {
          case 'microphone':
            return (await check(PERMISSIONS.IOS.MICROPHONE)) === RESULTS.GRANTED;
          case 'camera':
            return (await check(PERMISSIONS.IOS.CAMERA)) === RESULTS.GRANTED;
          case 'notifications': {
            const { status } = await checkNotifications();
            return status === RESULTS.GRANTED;
          }
          default:
            return false;
        }
      }
    } catch (error) {
      console.log('Permission check error:', error);
      return false;
    }
  }

  static async requestAllPermissions() {
    const permissions = await Promise.all([
      this.requestStoragePermission(),
      this.requestMicrophonePermission(),
      this.requestNotificationPermission(),
    ]);

    const allGranted = permissions.every(granted => granted);

    if (!allGranted) {
      Alert.alert(
        'Permissions Required',
        'Some permissions were not granted. The app may not function properly.',
        [{ text: 'OK' }]
      );
    }

    return allGranted;
  }
}