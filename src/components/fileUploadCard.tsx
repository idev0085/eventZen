import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  CloseIcon,
  CloudUploadIcon,
  COLORS,
  JPGIcon,
  PNGIcon,
  TEXT_SIZES,
} from '../utils/constants';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
}

interface LocalFileState {
  id?: string;
  name: string;
  url?: string;
  uploading?: boolean;
  deleting?: boolean;
  error?: string | null;
}

interface FileUploadCardProps {
  maxFiles?: number;
  maxSizeMB?: number;
  title?: string;
  description?: string;
  label?: string;
  labelStyle?: object;
  initialFiles?: UploadedFile[];
  autoUpload?: boolean;
  onUpload: (payload: string | FormData) => Promise<any> | void;
  onDelete: (fileId: string) => Promise<any> | void;
  showInitialFiles?: boolean;
  isUploading?: boolean;
  isDeleting?: boolean;
  type?: 'sponsor' | 'connection' | 'exhibitor' | '';
  profileData?: any | null;
  exhibitorId?: number | string;
  sponsorId?: number | string;
}

const FileUploadCard = ({
  maxFiles = 1,
  maxSizeMB = 10,
  title = 'Select file to upload',
  description = 'SVG, PNG, JPG or GIF (max 10 MB)',
  label,
  labelStyle,
  initialFiles = [],
  autoUpload = false,
  onUpload,
  onDelete,
  showInitialFiles = true,
  isUploading = false,
  isDeleting = false,
  type = '',
  profileData,
  exhibitorId,
  sponsorId,
}: FileUploadCardProps) => {
  const [localFiles, setLocalFiles] = useState<LocalFileState[]>(
    () =>
      (initialFiles || []).map(f => ({
        id: f.id,
        name: f.name,
        url: f.url,
        uploading: false,
        deleting: false,
        error: null,
      })) || [],
  );

  useEffect(() => {
    const mapped = (initialFiles || []).map(f => ({
      id: f.id,
      name: f.name,
      url: f.url,
      uploading: false,
      deleting: false,
      error: null,
    }));
    setLocalFiles(mapped);
  }, [JSON.stringify(initialFiles)]);

  const remainingSlots = Math.max(0, maxFiles - localFiles.length);

  const handlePick = async () => {
    if (localFiles.length >= maxFiles) {
      Alert.alert(
        'Limit reached',
        `You can upload a maximum of ${maxFiles} files.`,
      );
      return;
    }

    const selectionLimit = remainingSlots > 0 ? remainingSlots : 1;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit,
      includeBase64: !autoUpload || maxFiles === 1,
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      console.warn('ImagePicker Error: ', result.errorMessage);
      Toast.show('Could not open image library.', Toast.LONG);
      return;
    }

    if (!result.assets || result.assets.length === 0) return;

    for (const asset of result.assets) {
      try {
        if (!asset) continue;

        if (asset.fileSize && asset.fileSize > maxSizeMB * 1024 * 1024) {
          Toast.show(
            `Please select an image smaller than ${maxSizeMB}MB.`,
            Toast.LONG,
          );
          continue;
        }

        const displayName =
          asset.fileName || asset.uri?.split('/').pop() || 'unknown';

        if (autoUpload && maxFiles > 1) {
          const localEntryIndex = setLocalFileUploading(displayName);

          const form = new FormData();
          form.append('file', {
            // @ts-ignore
            uri: asset.uri,
            name: asset.fileName || `${Date.now()}.jpg`,
            type: asset.type || 'image/jpeg',
          });
          form.append('type', type);

          try {
            const uploadResult = await onUpload(form);
            if (uploadResult && (uploadResult.fileId || uploadResult.fileUrl)) {
              const returnedId =
                uploadResult.fileId || uploadResult.fileID || uploadResult.id;
              const returnedUrl = uploadResult.fileUrl || uploadResult.url;
              setLocalFiles(prev => {
                const copy = [...prev];
                if (localEntryIndex >= 0 && localEntryIndex < copy.length) {
                  copy[localEntryIndex] = {
                    ...copy[localEntryIndex],
                    uploading: false,
                    id: returnedId || copy[localEntryIndex].id,
                    url: returnedUrl || copy[localEntryIndex].url,
                  };
                }
                return copy;
              });
            } else {
              markLocalFileUploaded(localEntryIndex);
            }
          } catch (err) {
            console.error('Upload failed', err);
            markLocalFileError(localEntryIndex, 'Upload failed');
            Toast.show('Upload failed. Please try again.', Toast.LONG);
          }
        } else {
          if (!asset.base64) {
            Toast.show(
              'Unable to read file data. Please try another file.',
              Toast.LONG,
            );
            continue;
          }

          const mimeType = asset.type || 'image/jpeg';
          const base64WithPrefix = `data:${mimeType};base64,${asset.base64}`;

          onUpload(base64WithPrefix);

          setLocalFiles([
            {
              id: Date.now().toString(),
              name: displayName,
              url: asset.uri,
              uploading: false,
              deleting: false,
              error: null,
            },
          ]);
        }
      } catch (err) {
        console.error('handlePick error', err);
        Toast.show('Something went wrong. Please try again.', Toast.LONG);
      }
    }
  };

  // Helpers
  const setLocalFileUploading = (name: string) => {
    const newEntry: LocalFileState = {
      name,
      uploading: true,
      deleting: false,
      error: null,
    };
    setLocalFiles(prev => [...prev, newEntry]);
    return localFiles.length;
  };

  const markLocalFileError = (index: number, errMsg: string) => {
    setLocalFiles(prev => {
      const copy = [...prev];
      if (index >= 0 && index < copy.length) {
        copy[index] = { ...copy[index], uploading: false, error: errMsg };
      }
      return copy;
    });
  };

  const markLocalFileUploaded = (index: number) => {
    setLocalFiles(prev => {
      const copy = [...prev];
      if (index >= 0 && index < copy.length) {
        copy[index] = { ...copy[index], uploading: false, error: null };
      }
      return copy;
    });
  };

  const handleDeletePress = async (file: LocalFileState) => {
    if (!file) return;

    if (!file.id) {
      setLocalFiles(prev => prev.filter(f => f !== file));
      return;
    }

    setLocalFiles(prev =>
      prev.map(f => (f.id === file.id ? { ...f, deleting: true } : f)),
    );

    try {
      await onDelete(file.id!);
      setLocalFiles(prev => prev.filter(f => f.id !== file.id));
      Toast.show('File deleted successfully!', Toast.SHORT);
    } catch (err) {
      console.error('Delete failed', err);
      setLocalFiles(prev =>
        prev.map(f => (f.id === file.id ? { ...f, deleting: false } : f)),
      );
      Toast.show('Failed to delete file. Please try again.', Toast.LONG);
    }
  };

  const getFileTypeIcon = (fileName: string) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') return <JPGIcon />;
    if (ext === 'png') return <PNGIcon />;
    return null;
  };

  console.log('profileData', profileData);
  console.log('exhibitorId', exhibitorId);
  console.log('sponsorId', sponsorId);
  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      {(profileData?.is_exhibitor_id === exhibitorId ||
        profileData?.is_sponsor_id === sponsorId) && (
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={handlePick}
          disabled={isUploading}
          activeOpacity={0.8}
        >
          <View style={styles.placeholder}>
            {isUploading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <>
                <View style={styles.uploadIcon}>
                  <CloudUploadIcon width={40} height={40} />
                </View>
                <Text style={styles.uploadText}>{title}</Text>
                <Text style={styles.hintText}>{description}</Text>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handlePick}
                >
                  <CloudUploadIcon color={'#fff'} />
                  <Text style={styles.uploadButtonText}>Upload File</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      )}

      {showInitialFiles && localFiles.length > 0 && (
        <ScrollView style={{ marginTop: 12 }}>
          {localFiles.map((file, i) => (
            <View key={`${file.id ?? file.name}-${i}`} style={styles.list}>
              <View>{getFileTypeIcon(file.name)}</View>
              <View style={styles.fileInfoContainer}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {file.name}
                </Text>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  {file.uploading && <ActivityIndicator size="small" />}
                  {file.error && (
                    <Text style={{ color: 'red', marginRight: 8 }}>!</Text>
                  )}
                  {(profileData?.is_exhibitor_id === exhibitorId ||
                    profileData?.is_sponsor_id === sponsorId) && (
                    <TouchableOpacity
                      onPress={() => handleDeletePress(file)}
                      disabled={file.deleting || isDeleting}
                    >
                      {file.deleting ? (
                        <ActivityIndicator size="small" />
                      ) : (
                        <CloseIcon width={18} height={18} />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
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
  wrapper: { backgroundColor: '#fff', borderRadius: 8 },
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
  placeholder: { justifyContent: 'center', alignItems: 'center' },
  uploadIcon: { backgroundColor: '#E2E2E2', borderRadius: 100, padding: 5 },
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
    marginBottom: 6,
  },
  fileName: { color: COLORS.primary, fontSize: TEXT_SIZES.xs, flex: 1 },
  fileInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
