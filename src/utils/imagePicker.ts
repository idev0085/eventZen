import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

export const pickImage = async (): Promise<{
  uri: string;
  type: string;
  name: string;
} | null> => {
  return new Promise(resolve => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: false,
        includeExtra: true,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          resolve(null);
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
          resolve(null);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          if (!asset.uri) {
            console.log('No URI found in asset');
            return resolve(null);
          }

          const fileName = asset.fileName || `avatar_${Date.now()}.jpg`;
          const fileType = asset.type || 'image/jpeg';

          console.log('Selected file:', {
            uri: asset.uri,
            type: fileType,
            name: fileName,
          });

          resolve({
            uri: asset.uri,
            type: fileType,
            name: fileName,
          });
        } else {
          console.log('No assets found in response');
          resolve(null);
        }
      },
    );
  });
};
