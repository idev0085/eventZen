import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  Code,
  CodeScanner,
} from 'react-native-vision-camera';
// import ScreenBrightness from 'react-native-screen-brightness';

import { COLORS } from '../utils/constants';
import Toast from 'react-native-simple-toast';
import Ionicons from '@react-native-vector-icons/ionicons';

interface QRScannerModalProps {
  onClose: () => void;
  onScanSuccess: (qrValue: string) => void;
}

const QRScannerModal = ({ onClose, onScanSuccess }: QRScannerModalProps) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isProcessing, setIsProcessing] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const handleCodeScanned = useCallback(
    (codes: Code[]) => {
      if (codes.length > 0 && !isProcessing) {
        const qrValue = codes[0].value;
        if (qrValue) {
          setIsProcessing(true);
          handleQrDetected(qrValue);
        }
      }
    },
    [isProcessing],
  );

  const codeScanner: CodeScanner = {
    codeTypes: ['qr'],
    onCodeScanned: handleCodeScanned,
  };

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }

      // Boost brightness
    //   try {
    //     // await ScreenBrightness.setBrightness(1);
    //   } catch (error) {
    //     console.warn('Failed to set screen brightness:', error);
    //   }
    // })();

    // return () => {
    //   // Reset brightness
    //   ScreenBrightness.setBrightness(0.5).catch(error =>
    //     console.warn('Failed to reset screen brightness:', error),
    //   );
    };
  }, [hasPermission, requestPermission]);

  const handleQrDetected = useCallback(
    async (qrValue: string) => {
      try {
        // API call with scanned QR
        const response = await fetch('https://your-api.com/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qr: qrValue }),
        });

        if (!response.ok) throw new Error('API call failed');

        Toast.show('QR Scanned Successfully!', Toast.LONG);
        onScanSuccess(qrValue);
        onClose(); // close scanner
      } catch (error) {
        console.error(error);
        Toast.show('Failed to process QR', Toast.LONG);
        setIsProcessing(false); // allow retry
      }
    },
    [onClose, onScanSuccess],
  );

  if (device == null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.white }}>
          No camera device found
        </Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.white }}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
        torch={torchOn ? 'on' : 'off'}
      />

      {/* Scanner Overlay */}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanBox}>
            <View style={styles.scanLine} />
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay} />
      </View>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={28} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Torch Button */}
      <TouchableOpacity
        style={styles.torchButton}
        onPress={() => setTorchOn(prev => !prev)}
      >
        <Ionicons
          name={torchOn ? 'flashlight' : 'flashlight-outline'}
          size={28}
          color={COLORS.white}
        />
      </TouchableOpacity>

      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color={COLORS.white} />
          <Text style={styles.processingText}>Processing QR code...</Text>
        </View>
      )}
    </View>
  );
};

export default QRScannerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  torchButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    padding: 12,
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  middleRow: {
    flexDirection: 'row',
    width: '100%',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  scanLine: {
    height: 2,
    backgroundColor: COLORS.primary,
    width: '100%',
    position: 'absolute',
    top: '50%',
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 20,
  },
  processingText: {
    color: COLORS.white,
    marginTop: 16,
    fontSize: 16,
  },
});
