import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScannerActionIcon } from '../utils/constants';
import QRScannerModal from './QRScannerModal';
import { useScanConnection } from '../hooks/useConnections';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from './loadingOverlay';
import AlertModal from '../screens/AlertModal';

const FloatingScannerCTA = () => {
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();

  const { mutate: performScan, isPending: isScanning } = useScanConnection({
    onScanError: () => {
      setScannerVisible(false);
      setAlertVisible(true);
    },
  });

  const handleScanSuccess = (qrValue: string) => {
    console.log('Scanned:', qrValue);
    setScannerVisible(false);
    performScan(JSON.parse(qrValue).id);
  };

  const handleManualEntry = () => {
    setAlertVisible(false);
    navigation.navigate('ConnectionForm');
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScannerVisible(true)}
        >
          <ScannerActionIcon />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isScannerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setScannerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <QRScannerModal
            onClose={() => setScannerVisible(false)}
            onScanSuccess={handleScanSuccess}
          />
        </View>
      </Modal>

      <AlertModal
        isVisible={isAlertVisible}
        onClose={() => setAlertVisible(false)}
        onButtonPress={handleManualEntry}
      />

      {isScanning && <LoadingOverlay visible={true} />}
    </>
  );
};

export default FloatingScannerCTA;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
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
