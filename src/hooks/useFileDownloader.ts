import { useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';

const androidRequest = async () => {
  try {
    // For Android 13+ (API 33+), we need READ_MEDIA_IMAGES for media files
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

    // For Android 10-12, request WRITE_EXTERNAL_STORAGE
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

    return true; // For Android <10, no special permission needed
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

    const canWrite = await androidRequest();
    if (!canWrite) {
      Alert.alert('Permission Denied', 'Please allow storage access.');
      return;
    }

    setIsDownloading(true);

    try {
      // First, download the file to a temporary location
      const { config, fs } = RNBlobUtil;

      // Create a temporary file in cache directory
      const tempPath = `${
        fs.dirs.CacheDir
      }/${fileName}_${Date.now()}.${fileType}`;

      // Download to temporary location
      const response = await config({
        fileCache: true,
        path: tempPath,
      }).fetch('GET', url);

      // Now use MediaStore API to copy to public Downloads directory
      if (Number(Platform.Version) >= 29) {
        // Android 10+ - Use MediaStore API
        await RNBlobUtil.MediaCollection.copyToMediaStore(
          {
            name: `${fileName}.${fileType}`,
            parentFolder: '', // Save to root of Downloads
            mimeType: getMimeType(fileType),
          },
          'Download', // Media Collection type
          response.path(), // Source file path
        );

        // Clean up temporary file
        await fs.unlink(response.path());
      } else {
        // Android 9 and below - Use direct path
        const publicPath = `/storage/emulated/0/Download/${fileName}.${fileType}`;
        await fs.mv(response.path(), publicPath);
      }

      Alert.alert(
        'Download Complete',
        `File saved to Downloads: ${fileName}.${fileType}`,
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
