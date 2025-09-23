import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {
  CloseIcon,
  CloudUploadIcon,
  COLORS,
  JPGIcon,
  PNGIcon,
  TEXT_SIZES,
} from '../utils/constants';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

interface FileUploadCardProps {
  maxFiles?: number;
  maxSizeMB?: number;
  onFileChange: (base64String: string | null) => void;
  title: string;
  description: string;
  label?: string;
  labelStyle?: object;
}

const FileUploadCard = ({
  maxFiles = 1,
  maxSizeMB = 10,
  title = 'Select file to upload',
  description = 'SVG, PNG, JPG or GIF (max 10 MB)',
  label,
  labelStyle,
  onFileChange,
}: FileUploadCardProps) => {
  const [files, setFiles] = useState<Asset[]>([]);

  const handlePick = async () => {
    if (files.length >= maxFiles) {
      Alert.alert(
        'Limit reached',
        `You can only upload a maximum of ${maxFiles} file.`,
      );
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
    });

    if (result.didCancel || result.errorCode) {
      if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Toast.show('Could not open image library.', Toast.LONG);
      }
      return;
    }

    if (result.assets && result.assets[0]) {
      const selectedAsset = result.assets[0];

      if (
        selectedAsset.fileSize &&
        selectedAsset.fileSize > maxSizeMB * 1024 * 1024
      ) {
        Alert.alert(
          'File too large',
          `Please select a file smaller than ${maxSizeMB}MB.`,
        );
        return;
      }

      setFiles([selectedAsset]);

      if (selectedAsset.base64) {
        onFileChange(selectedAsset.base64);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles([]);
    onFileChange(null);
  };

  const getFileType = (file: Asset) => {
    const ext = file.fileName?.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') return <JPGIcon />;
    if (ext === 'png') return <PNGIcon />;
    return null;
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableOpacity style={styles.uploadBox} onPress={handlePick}>
        <View style={styles.placeholder}>
          <View style={styles.uploadIcon}>
            <CloudUploadIcon width={40} height={40} />
          </View>
          <Text style={styles.uploadText}>{title}</Text>
          <Text style={styles.hintText}>{description}</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handlePick}>
            <CloudUploadIcon color={'#fff'} />
            <Text style={styles.uploadButtonText}>Upload File</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {files.length > 0 && (
        <ScrollView style={{ marginTop: 12 }}>
          {files.map((file, i) => (
            <View
              key={i}
              style={[
                styles.list,
                { marginBottom: files.length === 1 ? 0 : 6 },
              ]}
            >
              <View>{getFileType(file)}</View>
              <View style={styles.fileInfoContainer}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {file.fileName}
                </Text>
                <TouchableOpacity onPress={() => removeFile(i)}>
                  <CloseIcon width={18} height={18} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FileUploadCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
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
  list: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3EDFF',
    borderRadius: 10,
    gap: 5,
  },
  fileName: {
    color: COLORS.primary,
    fontSize: TEXT_SIZES.xs,
  },
  fileInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
