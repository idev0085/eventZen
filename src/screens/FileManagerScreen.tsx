import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import { FileService } from '../services/FileService';
import { AudioService } from '../services/AudioService';

interface AudioFile {
  id: string;
  name: string;
  duration: string;
  size: string;
  format: string;
  favorite: boolean;
  createdAt: string;
  uri: string;
}

export default function FileManagerScreen() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const audioFiles = await FileService.getAllFiles();
      setFiles(audioFiles);
    } catch (error) {
      Alert.alert('Error', 'Failed to load files');
    }
  };

  const handlePlayFile = async (file: AudioFile) => {
    try {
      await AudioService.playAudio(file.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to play file');
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    Alert.alert(
      'Delete File',
      'Are you sure you want to delete this file?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await FileService.deleteFile(fileId);
              setFiles(prev => prev.filter(file => file.id !== fileId));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete file');
            }
          },
        },
      ]
    );
  };

  const handleRenameFile = async (fileId: string, currentName: string) => {
    Alert.prompt(
      'Rename File',
      'Enter new name:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Rename',
          onPress: async (newName) => {
            if (newName && newName.trim()) {
              try {
                await FileService.renameFile(fileId, newName.trim());
                setFiles(prev =>
                  prev.map(file =>
                    file.id === fileId ? { ...file, name: newName.trim() } : file
                  )
                );
              } catch (error) {
                Alert.alert('Error', 'Failed to rename file');
              }
            }
          },
        },
      ],
      'plain-text',
      currentName
    );
  };

  const toggleFavorite = async (fileId: string) => {
    try {
      await FileService.toggleFavorite(fileId);
      setFiles(prev =>
        prev.map(file =>
          file.id === fileId ? { ...file, favorite: !file.favorite } : file
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorite');
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' ||
      (filterBy === 'favorites' && file.favorite) ||
      (filterBy === 'recent' && new Date(file.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>File Manager</Text>
        <Text style={styles.headerSubtitle}>Organize your audio files</Text>
      </LinearGradient>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search files..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {['all', 'favorites', 'recent'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, filterBy === filter && styles.filterChipActive]}
              onPress={() => setFilterBy(filter)}
            >
              <Text style={[styles.filterText, filterBy === filter && styles.filterTextActive]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredFiles.length} Files
            </Text>
            <TouchableOpacity>
              <Icon name="sort" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          {filteredFiles.map((file) => (
            <View key={file.id} style={styles.fileCard}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => handlePlayFile(file)}
              >
                <Icon name="play-arrow" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{file.name}</Text>
                <View style={styles.fileMetadata}>
                  <Text style={styles.fileDetail}>{file.duration}</Text>
                  <Text style={styles.fileDivider}>•</Text>
                  <Text style={styles.fileDetail}>{file.size}</Text>
                  <Text style={styles.fileDivider}>•</Text>
                  <Text style={styles.fileDetail}>{file.format}</Text>
                </View>
              </View>

              <View style={styles.fileActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => toggleFavorite(file.id)}
                >
                  <Icon
                    name={file.favorite ? 'favorite' : 'favorite-border'}
                    size={20}
                    color={file.favorite ? '#EF4444' : '#9CA3AF'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    Alert.alert(
                      'File Options',
                      'Choose an action',
                      [
                        { text: 'Rename', onPress: () => handleRenameFile(file.id, file.name) },
                        { text: 'Delete', onPress: () => handleDeleteFile(file.id), style: 'destructive' },
                        { text: 'Cancel', style: 'cancel' },
                      ]
                    );
                  }}
                >
                  <Icon name="more-vert" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredFiles.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="folder-open" size={64} color="#E5E7EB" />
              <Text style={styles.emptyTitle}>No files found</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery ? 'Try adjusting your search' : 'Import some audio files to get started'}
              </Text>
            </View>
          )}
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
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#1F2937',
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
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
  playButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 24,
    width: 48,
    height: 48,
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
  fileDetail: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  fileDivider: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  fileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});