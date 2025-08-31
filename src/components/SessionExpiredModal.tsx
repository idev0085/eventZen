import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Button from './ui/button';
import { useUiStore } from '../stores/uiStore';
import { useAuth } from '../hooks/useAuth';

export const SessionExpiredModal = () => {
  const { isSessionModalVisible, hideSessionModal } = useUiStore();
  const { logout } = useAuth();

  const handleLogout = () => {
    hideSessionModal(); // Close the modal
    logout(); // Log the user out
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isSessionModalVisible}
      onRequestClose={() => {}} // Prevent closing with back button
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Session Expired</Text>
          <Text style={styles.modalText}>
            Your session has expired. Please log in again to continue.
          </Text>
          <Button title="OK" onPress={handleLogout} style={{ width: '100%' }} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
  },
});
