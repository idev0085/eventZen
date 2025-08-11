import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import { EffectsService } from '../services/EffectsService';

const effectCategories = [
  {
    name: 'Basic',
    effects: [
      { id: 'volume', name: 'Volume', icon: 'volume-up', min: 0, max: 200, value: 100, unit: '%' },
      { id: 'speed', name: 'Speed', icon: 'speed', min: 0.5, max: 2.0, value: 1.0, unit: 'x' },
      { id: 'pitch', name: 'Pitch', icon: 'tune', min: -12, max: 12, value: 0, unit: 'st' },
    ],
  },
  {
    name: 'Filters',
    effects: [
      { id: 'bass', name: 'Bass', icon: 'equalizer', min: -20, max: 20, value: 0, unit: 'dB' },
      { id: 'treble', name: 'Treble', icon: 'graphic-eq', min: -20, max: 20, value: 0, unit: 'dB' },
      { id: 'lowpass', name: 'Low Pass', icon: 'filter-list', min: 100, max: 20000, value: 20000, unit: 'Hz' },
    ],
  },
  {
    name: 'Time Effects',
    effects: [
      { id: 'echo', name: 'Echo', icon: 'repeat', min: 0, max: 100, value: 0, unit: '%' },
      { id: 'reverb', name: 'Reverb', icon: 'surround-sound', min: 0, max: 100, value: 0, unit: '%' },
      { id: 'delay', name: 'Delay', icon: 'access-time', min: 0, max: 1000, value: 0, unit: 'ms' },
    ],
  },
  {
    name: 'Dynamics',
    effects: [
      { id: 'compressor', name: 'Compressor', icon: 'compress', min: 0, max: 100, value: 0, unit: '%' },
      { id: 'limiter', name: 'Limiter', icon: 'block', min: -20, max: 0, value: 0, unit: 'dB' },
      { id: 'gate', name: 'Noise Gate', icon: 'security', min: -60, max: 0, value: -40, unit: 'dB' },
    ],
  },
];

export default function EffectsScreen() {
  const [effects, setEffects] = useState(effectCategories);
  const [previewMode, setPreviewMode] = useState(false);

  const handleEffectChange = async (categoryIndex: number, effectIndex: number, value: number) => {
    const updatedEffects = [...effects];
    updatedEffects[categoryIndex].effects[effectIndex].value = value;
    setEffects(updatedEffects);

    if (previewMode) {
      try {
        await EffectsService.previewEffect(
          updatedEffects[categoryIndex].effects[effectIndex].id,
          value
        );
      } catch (error) {
        console.log('Preview error:', error);
      }
    }
  };

  const resetEffect = (categoryIndex: number, effectIndex: number) => {
    const effect = effects[categoryIndex].effects[effectIndex];
    const defaultValue = effect.id === 'volume' ? 100 :
      effect.id === 'speed' ? 1.0 :
        effect.id === 'lowpass' ? 20000 :
          effect.id === 'gate' ? -40 : 0;

    handleEffectChange(categoryIndex, effectIndex, defaultValue);
  };

  const applyAllEffects = async () => {
    try {
      const activeEffects = effects.flatMap(category =>
        category.effects.filter(effect => {
          const isDefault = effect.id === 'volume' ? effect.value === 100 :
            effect.id === 'speed' ? effect.value === 1.0 :
              effect.id === 'lowpass' ? effect.value === 20000 :
                effect.id === 'gate' ? effect.value === -40 :
                  effect.value === 0;
          return !isDefault;
        })
      );

      await EffectsService.applyEffects(activeEffects);
      Alert.alert('Success', 'Effects applied successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to apply effects');
    }
  };

  const resetAllEffects = () => {
    Alert.alert(
      'Reset All Effects',
      'Are you sure you want to reset all effects to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: () => {
            effects.forEach((category, categoryIndex) => {
              category.effects.forEach((effect, effectIndex) => {
                resetEffect(categoryIndex, effectIndex);
              });
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>Audio Effects</Text>
        <Text style={styles.headerSubtitle}>Enhance your ringtone</Text>
      </LinearGradient>

      <View style={styles.controlsSection}>
        <View style={styles.previewToggle}>
          <Text style={styles.previewLabel}>Live Preview</Text>
          <TouchableOpacity
            style={[styles.toggleButton, previewMode && styles.toggleButtonActive]}
            onPress={() => setPreviewMode(!previewMode)}
          >
            <View style={[styles.toggleIndicator, previewMode && styles.toggleIndicatorActive]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetAllEffects}>
          <Icon name="refresh" size={20} color="#EF4444" />
          <Text style={styles.resetText}>Reset All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {effects.map((category, categoryIndex) => (
          <View key={category.name} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.name}</Text>

            {category.effects.map((effect, effectIndex) => (
              <View key={effect.id} style={styles.effectCard}>
                <View style={styles.effectHeader}>
                  <View style={styles.effectInfo}>
                    <Icon name={effect.icon} size={24} color="#8B5CF6" />
                    <Text style={styles.effectName}>{effect.name}</Text>
                  </View>

                  <View style={styles.effectValue}>
                    <Text style={styles.effectValueText}>
                      {effect.value.toFixed(effect.id === 'speed' ? 1 : 0)}{effect.unit}
                    </Text>
                    <TouchableOpacity
                      style={styles.resetEffectButton}
                      onPress={() => resetEffect(categoryIndex, effectIndex)}
                    >
                      <Icon name="refresh" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={effect.min}
                    maximumValue={effect.max}
                    value={effect.value}
                    onValueChange={(value) => handleEffectChange(categoryIndex, effectIndex, value)}
                    minimumTrackTintColor="#8B5CF6"
                    maximumTrackTintColor="#E5E7EB"
                    thumbStyle={styles.sliderThumb}
                  />

                  <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabel}>{effect.min}{effect.unit}</Text>
                    <Text style={styles.sliderLabel}>{effect.max}{effect.unit}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <TouchableOpacity style={styles.applyButton} onPress={applyAllEffects}>
            <LinearGradient colors={['#10B981', '#059669']} style={styles.applyGradient}>
              <Icon name="check" size={24} color="#FFFFFF" />
              <Text style={styles.applyText}>Apply Effects</Text>
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
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  previewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  toggleButton: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  toggleIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleIndicatorActive: {
    alignSelf: 'flex-end',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
  },
  resetText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  effectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  effectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  effectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  effectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  effectValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  effectValueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  resetEffectButton: {
    padding: 4,
  },
  sliderContainer: {
    marginTop: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#8B5CF6',
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  applyButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  applyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  applyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});