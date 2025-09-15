import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { CloudUploadIcon, COLORS, TEXT_SIZES } from '../utils/constants';

interface FileUploadCardProps {
  label: string;
  maxSizeMB?: number;
  onFileSelected: () => void;
}

const FileUploadCard = ({
  label = 'Visiting Card',
  maxSizeMB = 10,
  onFileSelected,
}: FileUploadCardProps) => {
  const [file, setFile] = useState(null);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      {/* Upload Box */}

      <TouchableOpacity style={styles.uploadBox}>
        {file ? (
          <Image source={{ uri: file }} style={styles.previewImage} />
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
    overflow: 'hidden',
    padding: 20,
    borderRadius: 8,
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
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
