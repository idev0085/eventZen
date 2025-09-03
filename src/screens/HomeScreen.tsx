import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HomeHeader from '../components/homeHeader';
import QuickActionMenu from '../components/quickActionMenu';
import UpcomingEvent from '../components/upcomingEvent';
import ConnectionsCard from '../components/connectionCard';
import { GENERATED_CONNECTIONS } from '../utils/constants';
import Toast from 'react-native-simple-toast';
import YoutubePlayer from 'react-native-youtube-iframe';
const HomeScreen = () => {
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      //Alert.alert('video has finished playing!');
    }
  }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying(prev => !prev);
  // }, []);
  const handleOnStartNetworking = () => {
    Toast.show('Start Networking Live', Toast.LONG);
  };
  return (
    <ScrollView style={styles.homeScreenContainer}>
      <HomeHeader
        userName="Hello, Arafat"
        welcomeMessage="Welcome !"
        profileImage="https://reactjs.org/logo-og.png"
        bellIcon="your_bell_icon_source"
      />
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={'iee2TATGMyI'}
        onChangeState={onStateChange}
      />
      <UpcomingEvent eventDate={new Date(2025, 8, 4, 2, 31, 0)} />
      <QuickActionMenu />
      <ConnectionsCard
        connections={GENERATED_CONNECTIONS}
        onStartNetworking={handleOnStartNetworking}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
  },
});
