// components/CustomSplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import BootSplash from 'react-native-bootsplash';

const { width, height } = Dimensions.get('window');

const CustomSplashScreen = ({ onHide }: any) => {
  useEffect(() => {
    const init = async () => {
      // You can add any initialization logic here
    };

    init().finally(() => {
      // Hide the native splash screen
      BootSplash.hide({ fade: true });
      // Notify parent component
      if (onHide) {
        onHide();
      }
    });
  }, [onHide]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splashscreen/splash.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Match your PNG background
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CustomSplashScreen;
