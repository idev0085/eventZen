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
import { AudioService } from '../services/AudioService';
import { FileService } from '../services/FileService';


export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentFiles, setRecentFiles] = useState([
    { id: 1, name: 'Morning Melody', duration: '0:30', favorite: true, rating: 4.8 },
    { id: 2, name: 'Electronic Beat', duration: '0:25', favorite: false, rating: 4.5 },
    { id: 3, name: 'Nature Sounds', duration: '0:35', favorite: true, rating: 4.9 },
    { id: 4, name: 'Classic Ring', duration: '0:20', favorite: false, rating: 4.2 },
  ]);
  const [popularCategories, setPopularCategories] = useState([
    { name: 'Popular', count: 156, gradient: ['#F59E0B', '#F97316'] },
    { name: 'Classical', count: 89, gradient: ['#8B5CF6', '#A855F7'] },
    { name: 'Electronic', count: 234, gradient: ['#10B981', '#059669'] },
    { name: 'Nature', count: 67, gradient: ['#3B82F6', '#1D4ED8'] },
  ]);

  useEffect(() => {
    //loadRecentFiles();
  }, []);

  const loadRecentFiles = async () => {
    try {
      const files = await FileService.getRecentFiles();
      setRecentFiles(files);
    } catch (error) {
      console.log('Error loading recent files:', error);
    }
  };

  const handlePlayRingtone = async (ringtone: any) => {
    try {
      await AudioService.playAudio(ringtone.uri);
    } catch (error) {
      console.log('Error playing ringtone:', error);
    }
  };

  const toggleFavorite = async (ringtoneId: number) => {
    try {
      await FileService.toggleFavorite(ringtoneId);
      setRecentFiles(prev =>
        prev.map(item =>
          item.id === ringtoneId ? { ...item, favorite: !item.favorite } : item
        )
      );
    } catch (error) {
      console.log('Error toggling favorite:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.subtitle}>Create amazing ringtones</Text>

        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ringtones..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {popularCategories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <LinearGradient colors={category.gradient} style={styles.categoryGradient}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} tones</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Creations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentFiles.map((ringtone) => (
            <TouchableOpacity key={ringtone.id} style={styles.ringtoneCard}>
              <View style={styles.ringtoneInfo}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => handlePlayRingtone(ringtone)}
                >
                  <Icon name="play-arrow" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.ringtoneDetails}>
                  <Text style={styles.ringtoneName}>{ringtone.name}</Text>
                  <View style={styles.ringtoneMetadata}>
                    <Icon name="access-time" size={12} color="#9CA3AF" />
                    <Text style={styles.ringtoneDuration}>{ringtone.duration}</Text>
                    <Icon name="star" size={12} color="#F59E0B" />
                    <Text style={styles.ringtoneRating}>{ringtone.rating}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.ringtoneActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => toggleFavorite(ringtone.id)}
                >
                  <Icon
                    name={ringtone.favorite ? 'favorite' : 'favorite-border'}
                    size={20}
                    color={ringtone.favorite ? '#EF4444' : '#9CA3AF'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="more-vert" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.quickActionGradient}>
                <Icon name="file-upload" size={32} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Import Audio</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient colors={['#10B981', '#059669']} style={styles.quickActionGradient}>
                <Icon name="mic" size={32} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Record Audio</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E5E7EB',
    marginBottom: 20,
  },
  searchBar: {
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
  },
  seeAllText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoryCard: {
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryGradient: {
    padding: 20,
    width: 140,
    height: 100,
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  ringtoneCard: {
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
  ringtoneInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  ringtoneDetails: {
    flex: 1,
  },
  ringtoneName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  ringtoneMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ringtoneDuration: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  ringtoneRating: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  ringtoneActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});