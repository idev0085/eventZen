import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  Code,
} from 'react-native-vision-camera';
import Toast from 'react-native-simple-toast';
import { COLORS } from '../utils/constants';
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
  const [cameraActive, setCameraActive] = useState(false);

  const requestAndroidPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to scan QR codes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    const initCamera = async () => {
      try {
        if (Platform.OS === 'android') {
          await requestAndroidPermission();
        }

        if (!hasPermission) {
          await requestPermission();
        }

        // Small delay to ensure camera is ready
        setTimeout(() => setCameraActive(true), 300);
      } catch (error) {
        console.error('Camera permission error:', error);
        Toast.show('Camera permission denied', Toast.LONG);
      }
    };

    initCamera();

    return () => setCameraActive(false);
  }, [hasPermission, requestPermission]);

  const handleCodeScanned = useCallback(
    (codes: Code[]) => {
      if (codes.length > 0 && !isProcessing && cameraActive) {
        const qrValue = codes[0].value;
        if (qrValue) {
          setIsProcessing(true);
          handleQrDetected(qrValue);
        }
      }
    },
    [isProcessing, cameraActive],
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'code-128'],
    onCodeScanned: handleCodeScanned,
  });

  const handleQrDetected = useCallback(
    async (qrValue: string) => {
      try {
        onScanSuccess(qrValue);
        onClose();
      } catch (error) {
        console.error(error);
        Toast.show('Failed to process QR', Toast.LONG);
        setIsProcessing(false);
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
          Camera permission required
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={cameraActive}
        codeScanner={codeScanner}
        torch={torchOn ? 'on' : 'off'}
        audio={false}
        video={true}
        orientation="portrait"
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanBox}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay}>
          <Text style={styles.instructionText}>
            Align QR code within the frame
          </Text>
        </View>
      </View>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={28} color={COLORS.white} />
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
    backgroundColor: COLORS.black,
    padding: 20,
  },
  permissionButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  permissionText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    padding: 10,
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    width: '100%',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: COLORS.primary,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: COLORS.primary,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  instructionText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
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
