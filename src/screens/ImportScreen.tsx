import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import { pick } from '@react-native-documents/picker';
import { AudioService } from '../services/AudioService';
import { FileService } from '../services/FileService';
import { PermissionService } from '../services/PermissionService';

const importOptions = [
  {
    icon: 'file-upload',
    title: 'Import Audio File',
    description: 'MP3, WAV, M4A, FLAC',
    action: 'audio',
    color: '#8B5CF6',
  },
  {
    icon: 'video-library',
    title: 'Import Video File',
    description: 'Extract audio from MP4, AVI, MOV',
    action: 'video',
    color: '#10B981',
  },
  {
    icon: 'mic',
    title: 'Record Audio',
    description: 'Record directly in the app',
    action: 'record',
    color: '#F59E0B',
  },
  {
    icon: 'library-music',
    title: 'Music Library',
    description: 'Import from device music',
    action: 'music',
    color: '#EF4444',
  },
];

const recentImports = [
  { id: 1, name: 'song_sample.mp3', size: '3.2 MB', type: 'audio', date: 'Today' },
  { id: 2, name: 'video_clip.mp4', size: '15.7 MB', type: 'video', date: 'Yesterday' },
  { id: 3, name: 'recording_001.wav', size: '8.1 MB', type: 'recording', date: '2 days ago' },
];

export default function ImportScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleImportAudio = async () => {
    try {
      const hasPermission = await PermissionService.requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Storage permission is needed to import files');
        return;
      }

      const result = await pick({
        type: ['audio/*'],
        allowMultiSelection: false,
      });

      if (result && result[0]) {
        const file = result[0];
        await FileService.importFile(file);
        Alert.alert('Success', 'Audio file imported successfully');
      }
    } catch (error) {

      Alert.alert('Error', 'Failed to import audio file');

    }
  };

  const handleImportVideo = async () => {
    try {
      const hasPermission = await PermissionService.requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Storage permission is needed to import files');
        return;
      }

      const result = await pick({
        type: ['video/*'],
        allowMultiSelection: false,
      });

      if (result && result[0]) {
        const file = result[0];
        await FileService.extractAudioFromVideo(file);
        Alert.alert('Success', 'Audio extracted from video successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to import video file');
    }
  };

  const handleStartRecording = async () => {
    try {
      const hasPermission = await PermissionService.requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Microphone permission is needed to record audio');
        return;
      }

      await AudioService.startRecording();
      setIsRecording(true);

      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Store timer reference for cleanup
      AudioService.setRecordingTimer(timer);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const handleStopRecording = async () => {
    try {
      const recordingPath = await AudioService.stopRecording();
      setIsRecording(false);
      setRecordingTime(0);

      if (recordingPath) {
        Alert.alert('Success', 'Recording saved successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const handleImportAction = (action: string) => {
    switch (action) {
      case 'audio':
        handleImportAudio();
        break;
      case 'video':
        handleImportVideo();
        break;
      case 'record':
        if (isRecording) {
          handleStopRecording();
        } else {
          handleStartRecording();
        }
        break;
      case 'music':
        Alert.alert('Music Library', 'This feature will be available in the next update');
        break;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>Import & Create</Text>
        <Text style={styles.headerSubtitle}>Add audio files or record new content</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Import Options</Text>
          <View style={styles.importGrid}>
            {importOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.importCard}
                onPress={() => handleImportAction(option.action)}
              >
                <View style={[styles.importIconContainer, { backgroundColor: `${option.color}20` }]}>
                  <Icon name={option.icon} size={32} color={option.color} />
                </View>
                <Text style={styles.importTitle}>{option.title}</Text>
                <Text style={styles.importDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {isRecording && (
          <View style={styles.recordingSection}>
            <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.recordingCard}>
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>Recording...</Text>
              </View>
              <Text style={styles.recordingTimer}>{formatTime(recordingTime)}</Text>
              <TouchableOpacity style={styles.stopButton} onPress={handleStopRecording}>
                <Text style={styles.stopButtonText}>Stop</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Imports</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Manage Files</Text>
            </TouchableOpacity>
          </View>

          {recentImports.map((file) => (
            <TouchableOpacity key={file.id} style={styles.fileCard}>
              <View style={styles.fileIcon}>
                <Icon
                  name={
                    file.type === 'audio'
                      ? 'audiotrack'
                      : file.type === 'video'
                        ? 'video-library'
                        : 'mic'
                  }
                  size={24}
                  color={
                    file.type === 'audio'
                      ? '#8B5CF6'
                      : file.type === 'video'
                        ? '#10B981'
                        : '#F59E0B'
                  }
                />
              </View>

              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{file.name}</Text>
                <View style={styles.fileMetadata}>
                  <Text style={styles.fileSize}>{file.size}</Text>
                  <Text style={styles.fileDivider}>•</Text>
                  <Text style={styles.fileDate}>{file.date}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.fileAction}>
                <Icon name="folder-open" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips & Guidelines</Text>
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Best Practices</Text>
            <Text style={styles.tipsText}>• Use high-quality audio files (320kbps or higher)</Text>
            <Text style={styles.tipsText}>• Keep ringtones between 20-40 seconds</Text>
            <Text style={styles.tipsText}>• Choose clear, distinctive sounds</Text>
            <Text style={styles.tipsText}>• Test on different volume levels</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E5E7EB',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  importGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  importCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  importIconContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  importTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  importDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  recordingSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  recordingCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recordingTimer: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  stopButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  fileMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileSize: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  fileDivider: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  fileDate: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  fileAction: {
    padding: 8,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
});