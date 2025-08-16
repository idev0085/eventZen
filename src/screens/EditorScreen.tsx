import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import { AudioService } from '../services/AudioService';
import { EffectsService } from '../services/EffectsService';
import WaveformVisualization from '../components/WaveformVisualization';

const { width } = Dimensions.get('window');

const audioEffects = [
  { id: 'fadein', name: 'Fade In', icon: 'trending-up', active: false },
  { id: 'fadeout', name: 'Fade Out', icon: 'trending-down', active: true },
  { id: 'echo', name: 'Echo', icon: 'graphic-eq', active: false },
  { id: 'reverb', name: 'Reverb', icon: 'surround-sound', active: false },
  { id: 'bass', name: 'Bass Boost', icon: 'equalizer', active: true },
  { id: 'treble', name: 'Treble', icon: 'tune', active: false },
];

const editingTools = [
  { id: 'trim', name: 'Trim', icon: 'content-cut', color: '#8B5CF6' },
  { id: 'copy', name: 'Copy', icon: 'content-copy', color: '#10B981' },
  { id: 'volume', name: 'Volume', icon: 'volume-up', color: '#F59E0B' },
  { id: 'speed', name: 'Speed', icon: 'speed', color: '#EF4444' },
];

export default function EditorScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(15);
  const [duration] = useState(45);
  const [startTime, setStartTime] = useState(10);
  const [endTime, setEndTime] = useState(35);
  const [selectedEffects, setSelectedEffects] = useState(audioEffects);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  useEffect(() => {
    // Generate mock waveform data
    const data = Array.from({ length: 50 }, () => Math.random());
    setWaveformData(data);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await AudioService.pauseAudio();
      } else {
        await AudioService.playAudio();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      Alert.alert('Error', 'Failed to control audio playback');
    }
  };

  const handleSeek = async (time: number) => {
    try {
      await AudioService.seekTo(time);
      setCurrentTime(time);
    } catch (error) {
      Alert.alert('Error', 'Failed to seek audio');
    }
  };

  const toggleEffect = async (effectId: string) => {
    try {
      const updatedEffects = selectedEffects.map(effect =>
        effect.id === effectId ? { ...effect, active: !effect.active } : effect
      );
      setSelectedEffects(updatedEffects);

      const activeEffects = updatedEffects.filter(effect => effect.active);
      await EffectsService.applyEffects(activeEffects);
    } catch (error) {
      Alert.alert('Error', 'Failed to apply effect');
    }
  };

  const handleTool = async (toolId: string) => {
    try {
      switch (toolId) {
        case 'trim':
          await AudioService.trimAudio(startTime, endTime);
          Alert.alert('Success', 'Audio trimmed successfully');
          break;
        case 'copy':
          await AudioService.copySegment(startTime, endTime);
          Alert.alert('Success', 'Segment copied to clipboard');
          break;
        case 'volume':
          Alert.alert('Volume', 'Volume adjustment panel would open here');
          break;
        case 'speed':
          Alert.alert('Speed', 'Speed adjustment panel would open here');
          break;
      }
    } catch (error) {
      Alert.alert('Error', `Failed to ${toolId} audio`);
    }
  };

  const handleExport = () => {
    Alert.alert(
      'Export Ringtone',
      'Choose export format',
      [
        { text: 'MP3', onPress: () => exportAudio('mp3') },
        { text: 'WAV', onPress: () => exportAudio('wav') },
        { text: 'M4R (iPhone)', onPress: () => exportAudio('m4r') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const exportAudio = async (format: string) => {
    try {
      const exportPath = await AudioService.exportAudio(format, selectedEffects);
      Alert.alert('Success', `Ringtone exported as ${format.toUpperCase()}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to export ringtone');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>Audio Editor</Text>
        <Text style={styles.headerSubtitle}>Morning_Melody.mp3</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Waveform Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Waveform</Text>
          <View style={styles.waveformContainer}>
            <WaveformVisualization
              data={waveformData}
              progress={currentTime / duration}
              startTime={startTime / duration}
              endTime={endTime / duration}
              onSeek={(progress) => handleSeek(progress * duration)}
            />

            <View style={styles.timeLabels}>
              <Text style={styles.timeLabel}>{formatTime(startTime)}</Text>
              <Text style={styles.timeLabel}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeLabel}>{formatTime(endTime)}</Text>
            </View>
          </View>
        </View>

        {/* Playback Controls */}
        <View style={styles.section}>
          <View style={styles.playbackControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="skip-previous" size={24} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.playButtonGradient}>
                <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={32} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <Icon name="skip-next" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.timeInfo}>
            <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
            <Text style={styles.duration}>/ {formatTime(duration)}</Text>
          </View>
        </View>

        {/* Editing Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Editing Tools</Text>
          <View style={styles.toolsGrid}>
            {editingTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={styles.toolCard}
                onPress={() => handleTool(tool.id)}
              >
                <Icon name={tool.icon} size={24} color={tool.color} />
                <Text style={styles.toolText}>{tool.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Audio Effects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio Effects</Text>
          <View style={styles.effectsGrid}>
            {selectedEffects.map((effect) => (
              <TouchableOpacity
                key={effect.id}
                style={[styles.effectCard, effect.active && styles.effectCardActive]}
                onPress={() => toggleEffect(effect.id)}
              >
                <Icon
                  name={effect.icon}
                  size={24}
                  color={effect.active ? '#8B5CF6' : '#6B7280'}
                />
                <Text style={[styles.effectText, effect.active && styles.effectTextActive]}>
                  {effect.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Export Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <LinearGradient colors={['#10B981', '#059669']} style={styles.exportGradient}>
              <Icon name="file-download" size={24} color="#FFFFFF" />
              <Text style={styles.exportText}>Export Ringtone</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  waveformContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 16,
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  playButtonGradient: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  currentTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  duration: {
    fontSize: 18,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '22%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  toolText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
  },
  effectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  effectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  effectCardActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3F4F6',
  },
  effectText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 8,
  },
  effectTextActive: {
    color: '#8B5CF6',
  },
  exportButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  exportGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  exportText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});