import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
// import { AuthService } from '../services/AuthService';
import { StorageService } from '../services/StorageService';
import { ThemeService } from '../services/ThemeService';

const settingsOptions = [
  {
    section: 'Account',
    items: [
      { icon: 'person', title: 'Profile Settings', subtitle: 'Update your information', action: 'profile' },
      { icon: 'notifications', title: 'Notifications', subtitle: 'Manage alerts and sounds', hasSwitch: true, action: 'notifications' },
      { icon: 'security', title: 'Privacy & Security', subtitle: 'Control your data', action: 'privacy' },
    ],
  },
  {
    section: 'Preferences',
    items: [
      { icon: 'palette', title: 'Theme', subtitle: 'Dark mode, colors', action: 'theme' },
      { icon: 'language', title: 'Language', subtitle: 'English (US)', action: 'language' },
      { icon: 'high-quality', title: 'Audio Quality', subtitle: 'High (320kbps)', action: 'quality' },
    ],
  },
  {
    section: 'Support',
    items: [
      { icon: 'help', title: 'Help & FAQ', subtitle: 'Get support', action: 'help' },
      { icon: 'star', title: 'Rate App', subtitle: 'Share your feedback', action: 'rate' },
    ],
  },
];

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [storageUsed, setStorageUsed] = useState(2.3);
  const [storageTotal] = useState(5.0);

  const handleSettingAction = async (action: string) => {
    switch (action) {
      case 'profile':
        Alert.alert('Profile Settings', 'Profile settings would open here');
        break;
      case 'notifications':
        // Toggle handled by switch
        break;
      case 'privacy':
        Alert.alert('Privacy & Security', 'Privacy settings would open here');
        break;
      case 'theme':
        try {
          await ThemeService.toggleDarkMode();
          setDarkModeEnabled(!darkModeEnabled);
        } catch (error) {
          Alert.alert('Error', 'Failed to change theme');
        }
        break;
      case 'language':
        Alert.alert('Language', 'Language selection would open here');
        break;
      case 'quality':
        Alert.alert('Audio Quality', 'Quality settings would open here');
        break;
      case 'help':
        Alert.alert('Help & FAQ', 'Help section would open here');
        break;
      case 'rate':
        Alert.alert('Rate App', 'App store rating would open here');
        break;
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              //await AuthService.signOut();
              // Navigate to onboarding
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  const handleManageStorage = async () => {
    try {
      const usage = await StorageService.getStorageUsage();
      setStorageUsed(usage.used);
      Alert.alert('Storage Management', 'Storage management would open here');
    } catch (error) {
      Alert.alert('Error', 'Failed to get storage info');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.profileCard}>
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.profileGradient}>
              <View style={styles.profileInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>
                <View style={styles.profileDetails}>
                  <Text style={styles.profileName}>John Doe</Text>
                  <Text style={styles.profileEmail}>john.doe@example.com</Text>
                  <Text style={styles.profilePlan}>Free Plan • 15 ringtones created</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && styles.settingItemBorder,
                  ]}
                  onPress={() => handleSettingAction(item.action)}
                >
                  <View style={styles.settingIcon}>
                    <Icon name={item.icon} size={24} color="#8B5CF6" />
                  </View>

                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>

                  {item.hasSwitch ? (
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{ false: '#E5E7EB', true: '#8B5CF6' }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <Icon name="chevron-right" size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Storage Usage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage</Text>
          <View style={styles.storageCard}>
            <View style={styles.storageHeader}>
              <Text style={styles.storageTitle}>Storage Used</Text>
              <Text style={styles.storageAmount}>
                {storageUsed.toFixed(1)} GB / {storageTotal.toFixed(1)} GB
              </Text>
            </View>

            <View style={styles.storageBar}>
              <View style={[styles.storageProgress, { width: `${(storageUsed / storageTotal) * 100}%` }]} />
            </View>

            <TouchableOpacity style={styles.manageStorageButton} onPress={handleManageStorage}>
              <Text style={styles.manageStorageText}>Manage Storage</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Icon name="logout" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Ringtone Studio</Text>
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
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  profileCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  profilePlan: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  storageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  storageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  storageAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  storageBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 16,
  },
  storageProgress: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  manageStorageButton: {
    alignItems: 'center',
  },
  manageStorageText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
});