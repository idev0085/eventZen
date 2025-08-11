import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import { AudioFile } from '../types';

const categories = [
  { id: 'all', name: 'All', count: 24 },
  { id: 'favorites', name: 'Favorites', count: 8 },
  { id: 'recent', name: 'Recent', count: 12 },
  { id: 'mp3', name: 'MP3', count: 18 },
  { id: 'wav', name: 'WAV', count: 4 },
  { id: 'm4a', name: 'M4A', count: 2 },
];

const mockLibrary: AudioFile[] = [
  {
    id: '1',
    name: 'Epic Orchestral Theme',
    uri: '/path/to/epic.mp3',
    duration: 180,
    size: 8640000,
    format: 'mp3',
    createdAt: '2025-01-01T10:00:00Z',
    favorite: true,
    tags: ['orchestral', 'epic', 'cinematic'],
  },
  {
    id: '2',
    name: 'Gentle Piano Melody',
    uri: '/path/to/piano.wav',
    duration: 120,
    size: 12288000,
    format: 'wav',
    createdAt: '2025-01-01T11:00:00Z',
    favorite: false,
    tags: ['piano', 'gentle', 'relaxing'],
  },
  {
    id: '3',
    name: 'Electronic Beat Drop',
    uri: '/path/to/electronic.mp3',
    duration: 90,
    size: 4320000,
    format: 'mp3',
    createdAt: '2025-01-01T12:00:00Z',
    favorite: true,
    tags: ['electronic', 'beat', 'energetic'],
  },
];

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [library, setLibrary] = useState<AudioFile[]>(mockLibrary);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredLibrary = library.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'favorites' && item.favorite) ||
      (selectedCategory === 'recent' && new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      item.format === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const toggleFavorite = (id: string) => {
    setLibrary(prev =>
      prev.map(item =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>Audio Library</Text>
        <Text style={styles.headerSubtitle}>Browse your audio collection</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search audio files..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            <Icon
              name={viewMode === 'list' ? 'grid-view' : 'view-list'}
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive,
                  ]}
                >
                  {category.name} ({category.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Audio Files */}
        <View style={styles.filesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredLibrary.length} Files
            </Text>
            <TouchableOpacity style={styles.sortButton}>
              <Icon name="sort" size={20} color="#8B5CF6" />
              <Text style={styles.sortText}>Name</Text>
            </TouchableOpacity>
          </View>

          {viewMode === 'list' ? (
            // List View
            filteredLibrary.map((file) => (
              <TouchableOpacity key={file.id} style={styles.fileCard}>
                <View style={styles.fileIcon}>
                  <Icon name="audiotrack" size={24} color="#8B5CF6" />
                </View>

                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <View style={styles.fileMetadata}>
                    <Text style={styles.fileMeta}>{formatDuration(file.duration)}</Text>
                    <Text style={styles.fileDivider}>•</Text>
                    <Text style={styles.fileMeta}>{formatFileSize(file.size)}</Text>
                    <Text style={styles.fileDivider}>•</Text>
                    <Text style={styles.fileMeta}>{file.format.toUpperCase()}</Text>
                  </View>
                  {file.tags && (
                    <View style={styles.tagsContainer}>
                      {file.tags.slice(0, 3).map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
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
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="play-arrow" size={20} color="#10B981" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="more-vert" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            // Grid View
            <View style={styles.gridContainer}>
              {filteredLibrary.map((file) => (
                <TouchableOpacity key={file.id} style={styles.gridCard}>
                  <View style={styles.gridIcon}>
                    <Icon name="audiotrack" size={32} color="#8B5CF6" />
                  </View>
                  <Text style={styles.gridFileName} numberOfLines={2}>
                    {file.name}
                  </Text>
                  <Text style={styles.gridFileMeta}>
                    {formatDuration(file.duration)}
                  </Text>
                  <TouchableOpacity
                    style={styles.gridFavorite}
                    onPress={() => toggleFavorite(file.id)}
                  >
                    <Icon
                      name={file.favorite ? 'favorite' : 'favorite-border'}
                      size={16}
                      color={file.favorite ? '#EF4444' : '#9CA3AF'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {filteredLibrary.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="library-music" size={64} color="#E5E7EB" />
              <Text style={styles.emptyTitle}>No Audio Files Found</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Import some audio files to build your library'}
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  viewToggle: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  categoryChip: {
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  categoryChipActive: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  filesSection: {
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
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
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
    marginBottom: 8,
  },
  fileMeta: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  fileDivider: {
    fontSize: 12,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
  },
  fileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  gridIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridFileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  gridFileMeta: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  gridFavorite: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
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