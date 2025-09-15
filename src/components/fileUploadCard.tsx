import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { CloudUploadIcon, COLORS, TEXT_SIZES } from '../utils/constants';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

interface FileUploadCardProps {
  label: string;
  maxSizeMB?: number;
  onFileSelected?: (file: Asset | null) => void;
}

const FileUploadCard = ({
  label = 'Visiting Card',
  maxSizeMB = 10,
  onFileSelected,
}: FileUploadCardProps) => {
  const [file, setFile] = useState<Asset | null>(null);

  const handleImagePick = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 1,
    };

    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', `Image picker error: ${result.errorMessage}`);
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];

        if (
          selectedAsset.fileSize &&
          selectedAsset.fileSize > maxSizeMB * 1024 * 1024
        ) {
          Alert.alert(
            'File too large',
            `Please select an image smaller than ${maxSizeMB}MB`,
          );
          return;
        }

        setFile(selectedAsset);
        if (onFileSelected) {
          onFileSelected(selectedAsset);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error('Image picker error:', error);
    }
  };

  const clearSelection = () => {
    setFile(null);
    if (onFileSelected) {
      onFileSelected(null);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      {/* Upload Box */}
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={file ? clearSelection : handleImagePick}
      >
        {file?.uri ? (
          <View style={styles.previewWrapper}>
            <Image source={{ uri: file.uri }} style={styles.previewImage} />
            <Text style={styles.changeText}>Tap to change</Text>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <View style={styles.uploadIcon}>
              <CloudUploadIcon width={40} height={40} />
            </View>
            <Text style={styles.uploadText}>Select file to upload</Text>
            <Text style={styles.hintText}>
              SVG, PNG, JPG or GIF (max {maxSizeMB}MB)
            </Text>
            <View style={styles.uploadButton}>
              <CloudUploadIcon color={'#fff'} />
              <Text style={styles.uploadButtonText}>Upload File</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FileUploadCard;

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  label: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CACACA',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    minHeight: 200,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    backgroundColor: '#E2E2E2',
    borderRadius: 100,
    padding: 5,
  },
  uploadText: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.black,
    marginVertical: 8,
  },
  hintText: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.tinyDot,
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: COLORS.white,
    fontSize: TEXT_SIZES.sm,
    fontWeight: '500',
  },
  // ✅ Image Preview Thumbnail
  previewWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  changeText: {
    color: COLORS.tinyDot,
    fontSize: TEXT_SIZES.xs,
    fontWeight: '500',
  },
});
