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
const PermissionsPage = () => {
  return <Text style={{ marginTop: 10 }}>Requesting camera permission...</Text>;
};
const NoCameraDeviceError = () => {
  return <Text style={{ marginTop: 10 }}>No camera device found.</Text>;
};

export default function TestCam() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    })();
  }, [hasPermission, requestPermission]);

  if (!hasPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
