import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScannerActionIcon } from '../utils/constants';
import QRScannerModal from './QRScannerModal';

const FloatingScannerCTA = () => {
  const [visible, setVisible] = useState(false);

  const handlePress = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <ScannerActionIcon />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <QRScannerModal
            onClose={closeModal}
            onScanSuccess={qrValue => {
              console.log('Scanned:', qrValue);
              closeModal();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default FloatingScannerCTA;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#0E69E3',
    borderRadius: 50,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});
