import React from 'react';
import { Modal, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
  animationType?: 'none' | 'slide' | 'fade';
  darkMode?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible = false,
  message = 'Loading...',
  animationType = 'fade',
  darkMode = false,
}) => {
  return (
    <Modal
      transparent
      animationType={animationType}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View
        style={[
          styles.modalBackground,
          {
            backgroundColor: darkMode
              ? 'rgba(0,0,0,0.7)'
              : 'rgba(255,255,255,0.9)',
          },
        ]}
      >
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color={darkMode ? '#fff' : '#333'} />
          {message ? (
            <Text
              style={[
                styles.messageText,
                { color: darkMode ? '#fff' : '#333' },
              ]}
            >
              {message}
            </Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  messageText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoadingOverlay;
