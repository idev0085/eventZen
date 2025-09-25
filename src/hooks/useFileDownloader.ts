import { useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';

const androidRequest = async () => {
  if (Platform.OS !== 'android') return true;
  try {
    if (Number(Platform.Version) >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Media Permission Required',
          message: 'App needs media access to save files to your gallery',
          buttonPositive: 'Proceed',
          buttonNegative: 'Cancel',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    if (Number(Platform.Version) >= 29) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs storage access to save files',
          buttonPositive: 'Proceed',
          buttonNegative: 'Cancel',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } catch (err) {
    console.error('Permission request error: ', err);
    return false;
  }
};

export function useFileDownloader() {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async ({ url, fileName, fileType = 'png' }) => {
    if (!url) {
      Alert.alert('Error', 'No file URL provided');
      return;
    }

    if (Platform.OS === 'android') {
      const canWrite = await androidRequest();
      if (!canWrite) {
        Alert.alert('Permission Denied', 'Please allow storage access.');
        return;
      }
    }

    setIsDownloading(true);

    try {
      const { config, fs } = RNBlobUtil;

      let savePath = '';
      if (Platform.OS === 'android') {
        if (Number(Platform.Version) >= 29) {
          // Use cache for temp, then MediaStore
          savePath = `${fs.dirs.CacheDir}/${fileName}_${Date.now()}.${fileType}`;
        } else {
          // Save directly to Downloads
          savePath = `/storage/emulated/0/Download/${fileName}.${fileType}`;
        }
      } else {
        // iOS: Save to Documents directory
        savePath = `${fs.dirs.DocumentDir}/${fileName}.${fileType}`;
      }

      // Download the file
      const response = await config({
        fileCache: true,
        path: savePath,
      }).fetch('GET', url);

      if (Platform.OS === 'android' && Number(Platform.Version) >= 29) {
        // Android 10+ - Use MediaStore API
        await RNBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: `${fileName}.${fileType}`,
            parentFolder: '',
            mimeType: getMimeType(fileType),
          },
          'Download',
          response.path(),
        );
        await fs.unlink(response.path());
      }

      Alert.alert(
        'Download Complete',
        `File saved to ${Platform.OS === 'android' ? 'Downloads' : 'Documents'}: ${fileName}.${fileType}`,
      );
    } catch (err) {
      console.error('Download failed:', err);
      Alert.alert('Download Failed', err.message || 'Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return { download, isDownloading };
}

const getMimeType = (fileType: string) => {
  const mimeTypes: any = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
  };
  return mimeTypes[fileType.toLowerCase()] || 'application/octet-stream';
};
