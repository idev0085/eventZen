import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HomeHeader from '../components/homeHeader';
import QuickActionMenu from '../components/quickActionMenu';
import UpcomingEvent from '../components/upcomingEvent';
import ConnectionsCard from '../components/connectionCard';
import { GENERATED_CONNECTIONS } from '../utils/constants';
import Toast from 'react-native-simple-toast';
import MyStats from '../components/myStats';
import FloatingScannerCTA from '../components/floatingScannerCTA';

const HomeScreen = () => {
  const handleOnStartNetworking = () => {
    Toast.show('Start Networking Live', Toast.LONG);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.homeScreenContainer}>
        <HomeHeader
          userName="Hello, Arafat"
          welcomeMessage="Welcome !"
          profileImage="https://reactjs.org/logo-og.png"
          bellIcon="your_bell_icon_source"
        />
        <UpcomingEvent eventDate={new Date(2025, 8, 4, 2, 31, 0)} />
        <QuickActionMenu />
        <ConnectionsCard
          connections={GENERATED_CONNECTIONS}
          onStartNetworking={handleOnStartNetworking}
        />
        <MyStats />
      </ScrollView>
      <FloatingScannerCTA />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeScreenContainer: {
    flex: 1,
  },
});
