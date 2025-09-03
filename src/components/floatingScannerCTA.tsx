import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScannerActionIcon } from '../utils/constants';

const FloatingScannerCTA = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ScannerScreen' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <ScannerActionIcon />
      </TouchableOpacity>
    </View>
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
});
