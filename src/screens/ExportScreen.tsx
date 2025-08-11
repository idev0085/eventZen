import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import { AudioService } from '../services/AudioService';
import { ShareService } from '../services/ShareService';

const exportFormats = [
  { id: 'mp3', name: 'MP3', description: 'Universal format', icon: 'audiotrack', color: '#8B5CF6' },
  { id: 'wav', name: 'WAV', description: 'High quality', icon: 'high-quality', color: '#10B981' },
  { id: 'm4r', name: 'M4R', description: 'iPhone ringtone', icon: 'phone-iphone', color: '#F59E0B' },
];

const qualityOptions = [
  { id: 'low', name: 'Low (128kbps)', size: '~1MB' },
  { id: 'medium', name: 'Medium (192kbps)', size: '~1.5MB' },
  { id: 'high', name: 'High (320kbps)', size: '~2.5MB' },
];

export default function ExportScreen() {
  const [selectedFormat, setSelectedFormat] = useState('mp3');
  const [selectedQuality, setSelectedQuality] = useState('high');
  const [fileName, setFileName] = useState('My_Ringtone');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!fileName.trim()) {
      Alert.alert('Error', 'Please enter a file name');
      return;
    }

    setIsExporting(true);

    try {
      const exportOptions = {
        format: selectedFormat,
        quality: selectedQuality,
        fileName: fileName.trim(),
      };

      const exportedFile = await AudioService.exportRingtone(exportOptions);

      Alert.alert(
        'Export Complete',
        `Ringtone exported successfully as ${fileName}.${selectedFormat}`,
        [
          { text: 'OK' },
          { text: 'Share', onPress: () => handleShare(exportedFile) },
          { text: 'Set as Ringtone', onPress: () => handleSetAsRingtone(exportedFile) },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to export ringtone');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async (filePath: string) => {
    try {
      await ShareService.shareFile(filePath);
    } catch (error) {
      Alert.alert('Error', 'Failed to share file');
    }
  };

  const handleSetAsRingtone = async (filePath: string) => {
    try {
      await AudioService.setAsRingtone(filePath);
      Alert.alert('Success', 'Ringtone set successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to set as ringtone');
    }
  };

  const handlePreview = async () => {
    try {
      await AudioService.previewExport({
        format: selectedFormat,
        quality: selectedQuality,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to preview export');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>Export Ringtone</Text>
        <Text style={styles.headerSubtitle}>Choose format and quality</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* File Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={fileName}
              onChangeText={setFileName}
              placeholder="Enter file name"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.fileExtension}>.{selectedFormat}</Text>
          </View>
        </View>

        {/* Export Format */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Format</Text>
          <View style={styles.formatGrid}>
            {exportFormats.map((format) => (
              <TouchableOpacity
                key={format.id}
                style={[
                  styles.formatCard,
                  selectedFormat === format.id && styles.formatCardSelected,
                ]}
                onPress={() => setSelectedFormat(format.id)}
              >
                <View style={[styles.formatIcon, { backgroundColor: `${format.color}20` }]}>
                  <Icon name={format.icon} size={32} color={format.color} />
                </View>
                <Text style={styles.formatName}>{format.name}</Text>
                <Text style={styles.formatDescription}>{format.description}</Text>
                {selectedFormat === format.id && (
                  <View style={styles.selectedIndicator}>
                    <Icon name="check-circle" size={20} color="#10B981" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quality Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quality</Text>
          <View style={styles.qualityContainer}>
            {qualityOptions.map((quality) => (
              <TouchableOpacity
                key={quality.id}
                style={[
                  styles.qualityOption,
                  selectedQuality === quality.id && styles.qualityOptionSelected,
                ]}
                onPress={() => setSelectedQuality(quality.id)}
              >
                <View style={styles.qualityInfo}>
                  <Text style={styles.qualityName}>{quality.name}</Text>
                  <Text style={styles.qualitySize}>{quality.size}</Text>
                </View>
                <View style={styles.radioButton}>
                  {selectedQuality === quality.id && <View style={styles.radioButtonSelected} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
            <Icon name="play-circle-outline" size={24} color="#8B5CF6" />
            <Text style={styles.previewText}>Preview Export</Text>
          </TouchableOpacity>
        </View>

        {/* Export Actions */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
            onPress={handleExport}
            disabled={isExporting}
          >
            <LinearGradient colors={['#10B981', '#059669']} style={styles.exportGradient}>
              <Icon name={isExporting ? 'hourglass-empty' : 'file-download'} size={24} color="#FFFFFF" />
              <Text style={styles.exportText}>
                {isExporting ? 'Exporting...' : 'Export Ringtone'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.exportOptions}>
            <TouchableOpacity style={styles.optionButton}>
              <Icon name="share" size={20} color="#8B5CF6" />
              <Text style={styles.optionText}>Export & Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton}>
              <Icon name="phone" size={20} color="#10B981" />
              <Text style={styles.optionText}>Set as Ringtone</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Export Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Tips</Text>
          <View style={styles.tipsCard}>
            <Text style={styles.tipText}>• MP3: Best for sharing and compatibility</Text>
            <Text style={styles.tipText}>• WAV: Highest quality, larger file size</Text>
            <Text style={styles.tipText}>• M4R: Required for iPhone ringtones</Text>
            <Text style={styles.tipText}>• Higher quality = better sound but larger files</Text>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#1F2937',
    paddingVertical: 16,
  },
  fileExtension: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  formatGrid: {
    gap: 16,
  },
  formatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formatCardSelected: {
    borderColor: '#10B981',
  },
  formatIcon: {
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  formatName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  formatDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    flex: 1,
  },
  selectedIndicator: {
    marginLeft: 12,
  },
  qualityContainer: {
    gap: 12,
  },
  qualityOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  qualityOptionSelected: {
    borderColor: '#8B5CF6',
  },
  qualityInfo: {
    flex: 1,
  },
  qualityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  qualitySize: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  previewText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  exportButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  exportButtonDisabled: {
    opacity: 0.6,
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
  exportOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
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
  tipText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
});