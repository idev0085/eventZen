import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HomeHeader from '../components/homeHeader';
import QuickActionMenu from '../components/quickActionMenu';
import UpcomingEvent from '../components/upcomingEvent';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.homeScreenContainer}>
      <HomeHeader
        userName="Hello, Arafat"
        welcomeMessage="Welcome !"
        profileImage="https://reactjs.org/logo-og.png"
        bellIcon="your_bell_icon_source"
      />
      <UpcomingEvent eventDate={new Date(2025, 8, 3, 2, 20, 0)} />
      <QuickActionMenu />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
  },
});
