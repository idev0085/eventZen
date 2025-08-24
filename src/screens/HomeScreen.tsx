import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeHeader from '../components/homeHeader';

const HomeScreen = () => {
  return (
    <View style={styles.homeScreenContainer}>
      <HomeHeader
        userName="Hello, Arafat"
        welcomeMessage="Welcome !"
        profileImage="https://reactjs.org/logo-og.png" // Replace with a real image URL
        bellIcon="your_bell_icon_source"
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
  },
});
