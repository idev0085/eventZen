import React, { useState } from 'react';
import {
  Image,
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
  PDFIcon,
  PNGIcon,
  TEXT_SIZES,
} from '../utils/constants';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

interface FileUploadCardProps {
  multiple: boolean;
  maxFiles: number;
  maxSizeMB?: number;
  onChange?: (files: Asset[]) => void;
  title: string;
  description: string;
  allowPdf?: boolean;
  label?: string; // Added label prop
  labelStyle?: object;
}

const FileUploadCard = ({
  multiple = false,
  maxFiles = 1,
  maxSizeMB = 10,
  onChange,
  title = 'Select file to upload',
  description = 'SVG, PNG, JPG or GIF (max 10 MB)',
  allowPdf = false,
  label, // Added label
  labelStyle,
}: FileUploadCardProps) => {
  const [files, setFiles] = useState<Asset[]>([]);

  const handlePick = async () => {
    if (files.length >= maxFiles) {
      Alert.alert('Limit reached', `You can upload max ${maxFiles} files`);
      return;
    }

    const result = await launchImageLibrary({
      mediaType: allowPdf ? 'mixed' : 'photo',
      selectionLimit: multiple ? maxFiles - files.length : 1,
    });

    if (result.assets) {
      const valid = result.assets.filter(
        f => !f.fileSize || f.fileSize <= maxSizeMB * 1024 * 1024,
      );
      setFiles(prev => [...prev, ...valid]);
      onChange?.([...files, ...valid]);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);

    setFiles(updated);
    onChange?.(updated);
  };

  const getFileType = (file: Asset) => {
    const ext = file.fileName?.split('.').pop()?.toLowerCase();

    if (ext?.includes('pdf')) {
      return <PDFIcon />;
    } else if (['jpg', 'jpeg'].includes(ext || '')) {
      return <JPGIcon />;
    } else if (ext?.includes('png')) {
      return <PNGIcon />;
    } else {
      return;
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Added label section */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      {/* Upload Box */}
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

      <ScrollView style={{ marginTop: 12 }}>
        {files.map((file, i) => (
          <View
            key={i}
            style={[styles.list, { marginBottom: files.length === 1 ? 0 : 6 }]}
          >
            <View>{getFileType(file)}</View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
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
    </View>
  );
};

export default FileUploadCard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  // Added label style
  label: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  title: {},
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
});
