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
import { launchImageLibrary, Asset } from 'react-native-image-picker';
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

/**
 * onUpload:
 *  - For single-mode (maxFiles === 1 && !autoUpload) we will call onUpload(base64String)
 *  - For multiple auto-upload (autoUpload === true && maxFiles > 1) we will call onUpload(formData)
 *
 * onDelete: expects a function that returns a Promise (so component can wait & update UI accordingly).
 */
interface FileUploadCardProps {
  maxFiles?: number;
  maxSizeMB?: number;
  title?: string;
  description?: string;
  label?: string;
  labelStyle?: object;
  initialFiles?: UploadedFile[]; // initial list from server (controlled)
  autoUpload?: boolean; // auto-upload immediately on selection
  onUpload: (payload: string | FormData) => Promise<any> | void; // parent handler (upload)
  onDelete: (fileId: string) => Promise<any> | void; // parent handler (delete)
  showInitialFiles?: boolean; // whether to show initialFiles list (controlled)
  isUploading?: boolean; // optional global flag
  isDeleting?: boolean; // optional global flag
  type?: 'sponsor' | 'connection' | 'exhibitor' | '';
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
}: FileUploadCardProps) => {
  if (!type && autoUpload) {
    Toast.show('Please specify the type', Toast.SHORT);
    return;
  }
  // local state holds both initialFiles and newly added files
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // selection limit: remaining slots
    const selectionLimit = remainingSlots > 0 ? remainingSlots : 1;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit,
      includeBase64: !autoUpload || maxFiles === 1, // include base64 if we need base64 (single mode)
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      console.warn('ImagePicker Error: ', result.errorMessage);
      Toast.show('Could not open image library.', Toast.LONG);
      return;
    }

    if (!result.assets || result.assets.length === 0) return;

    // process each selected asset
    for (const asset of result.assets) {
      try {
        if (!asset) continue;

        // safety checks
        if (asset.fileSize && asset.fileSize > maxSizeMB * 1024 * 1024) {
          Toast.show(
            `Please select an image smaller than ${maxSizeMB}MB.`,
            Toast.LONG,
          );
          continue;
        }

        const displayName =
          asset.fileName || asset.uri?.split('/').pop() || 'unknown';

        // Optimistically add to local state as uploading
        const localEntryIndex = setLocalFileUploading(displayName);

        if (autoUpload && maxFiles > 1) {
          // MULTIPLE AUTO-UPLOAD: send as FormData (multipart) — server expected file via formdata
          // Create FormData for this asset. Use uri, name and type for RN.
          const form = new FormData();

          // On Android uri comes as "file://..." or content://...
          // For iOS/Android we use the asset.uri directly
          form.append('file', {
            // @ts-ignore - React Native FormData file shape
            uri: asset.uri,
            name: asset.fileName || `${Date.now()}.jpg`,
            type: asset.type || 'image/jpeg',
          });

          // also append type param expected by backend
          form.append('type', type);

          // call parent onUpload with FormData
          let uploadResult;
          try {
            uploadResult = await onUpload(form);
          } catch (err) {
            // If parent returns a rejected promise, we catch it here
            console.error('Upload failed', err);
            markLocalFileError(localEntryIndex, 'Upload failed');
            Toast.show('Upload failed. Please try again.', Toast.LONG);
            continue;
          }

          // if upload succeeded and server returned fileId/fileUrl, update local state
          // we try to read common response fields if present
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
            // if parent didn't return data, mark as uploaded but not having server id
            markLocalFileUploaded(localEntryIndex);
          }
        } else {
          // SINGLE or manual mode => we need base64 (send JSON)
          if (!asset.base64) {
            // fallback: if base64 missing, warn user
            Toast.show(
              'Unable to read file data. Please try another file.',
              Toast.LONG,
            );
            markLocalFileErrorByName(displayName, 'No file data');
            continue;
          }
          const mimeType = asset.type || 'image/jpeg';
          const base64WithPrefix = `data:${mimeType};base64,${asset.base64}`;

          // For single upload the parent expects base64 string
          try {
            const res = await onUpload(base64WithPrefix);
            // parent may return server response; we try to update localFiles with returned id/url
            const index = setLocalFileUploading(displayName);
            if (res && (res.fileId || res.fileUrl)) {
              setLocalFiles(prev => {
                const copy = [...prev];
                if (index >= 0 && index < copy.length) {
                  copy[index] = {
                    ...copy[index],
                    uploading: false,
                    id: res.fileId || res.id || copy[index].id,
                    url: res.fileUrl || res.url || copy[index].url,
                  };
                }
                return copy;
              });
            } else {
              // If no response needed, just mark uploaded
              markLocalFileUploaded(index);
            }
          } catch (err) {
            console.error('Upload error', err);
            Toast.show('Upload failed. Please try again.', Toast.LONG);
            markLocalFileErrorByName(displayName, 'Upload failed');
            continue;
          }
        }
      } catch (err) {
        console.error('handlePick error', err);
        Toast.show('Something went wrong. Please try again.', Toast.LONG);
      }
    } // end loop assets
  };

  // helpers to manage localFiles state
  const setLocalFileUploading = (name: string) => {
    // add file entry and return its index
    const newEntry: LocalFileState = {
      name,
      uploading: true,
      deleting: false,
      error: null,
    };
    setLocalFiles(prev => [...prev, newEntry]);
    // index is last
    return localFiles.length; // note: localFiles isn't updated synchronously; caller should handle via returned index carefully
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

  const markLocalFileErrorByName = (name: string, errMsg: string) => {
    setLocalFiles(prev => {
      const copy = [...prev];
      const idx = copy.findIndex(x => x.name === name && x.uploading);
      if (idx >= 0)
        copy[idx] = { ...copy[idx], uploading: false, error: errMsg };
      return copy;
    });
  };

  // Delete handler triggered by cross icon
  const handleDeletePress = async (file: LocalFileState) => {
    if (!file) return;
    // If file has a server id, call parent onDelete. If it doesn't, just remove local entry.
    if (!file.id) {
      // not uploaded to server yet or single local file → just remove
      setLocalFiles(prev => prev.filter(f => f !== file));
      return;
    }

    // mark deleting
    setLocalFiles(prev =>
      prev.map(f => (f.id === file.id ? { ...f, deleting: true } : f)),
    );

    try {
      await onDelete(file.id!); // expect parent to return a Promise (mutateAsync preferred)
      // on success remove entry
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

  return (
    <View style={styles.wrapper}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

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
