import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SessionTimeOut, COLORS } from '../utils/constants';
export default function AlertModal({
  image = SessionTimeOut,
  heading = 'Scanning Failed',
  description = 'Unable to scan QR code. Switch to manual entry to join the event.',
  buttonText = 'Enter Manually',
}) {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.openButton}>
        <Text style={{ color: '#fff' }}>Open Modal</Text>
      </TouchableOpacity>
      <Modal
        isVisible={visible}
        onBackdropPress={closeModal}
        useNativeDriver
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={{ fontSize: 20, color: COLORS.primary }}>X</Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <SessionTimeOut />
          </View>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.modalText}>{description}</Text>
          <TouchableOpacity style={styles.blueButton} onPress={closeModal}>
            <Text style={styles.blueButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '70%',
    position: 'relative',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    zIndex: 1,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  blueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  blueButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
});
