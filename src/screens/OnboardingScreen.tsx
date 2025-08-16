import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native';
// import { AuthService } from '../services/AuthService';

const { width, height } = Dimensions.get('window');

const onboardingSteps = [
  {
    icon: 'headphones', // FontAwesome icon
    title: 'Create Perfect Ringtones',
    description: 'Transform any audio into personalized ringtones with professional-grade tools',
  },
  {
    icon: 'music', // FontAwesome icon
    title: 'Advanced Audio Editing',
    description: 'Trim, enhance, and apply stunning effects to make your ringtones unique',
  },
  {
    icon: 'share-alt', // FontAwesome icon (use 'share-alt' instead of 'share')
    title: 'Share Your Creations',
    description: 'Export in multiple formats and share your custom ringtones with friends',
  },
  {
    icon: 'paint-brush', // FontAwesome icon (use 'paint-brush' instead of 'palette')
    title: 'Personalize Everything',
    description: 'Choose themes, organize your library, and make the app truly yours',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoogleSignIn = async () => {
    // try {
    //   await AuthService.signInWithGoogle();
    //   navigation.navigate('Main' as never);
    // } catch (error) {
    //   Alert.alert('Error', 'Failed to sign in with Google');
    // }
  };

  const handleAppleSignIn = async () => {
    // try {
    //   await AuthService.signInWithApple();
    //   navigation.navigate('Main' as never);
    // } catch (error) {
    //   Alert.alert('Error', 'Failed to sign in with Apple');
    // }
  };

  const handleGuestMode = () => {
    navigation.navigate('Main' as never);
  };

  const skip = () => {
    navigation.navigate('Main' as never);
  };

  return (
    <LinearGradient colors={['#8B5CF6', '#A855F7', '#C084FC']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={skip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          {/* <Icon name={onboardingSteps[currentStep].icon} size={80} color="#FFFFFF" /> */}
          <FontAwesomeIcon name={onboardingSteps[currentStep].icon} color="#ff0000" size={20} />
        </View>

        <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
        <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>

        <View style={styles.pagination}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentStep && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.authSection}>
          {currentStep < onboardingSteps.length - 1 ? (
            <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.primaryButton} onPress={handleGoogleSignIn}>
                {/* <Icon name="login" size={20} color="#8B5CF6" style={styles.buttonIcon} /> */}
                <Text style={styles.primaryButtonText}>Sign in with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={handleAppleSignIn}>
                {/* <Icon name="apple" size={20} color="#FFFFFF" style={styles.buttonIcon} /> */}
                <Text style={styles.secondaryButtonText}>Sign in with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleGuestMode}>
                <Text style={styles.guestText}>Continue as Guest</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  authSection: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonIcon: {
    marginRight: 8,
  },
  guestText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16,
  },
});