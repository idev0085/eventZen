import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Alert, View, Text } from 'react-native';
import HomeHeader from '../components/homeHeader';
import QuickActionMenu from '../components/quickActionMenu';
import UpcomingEvent from '../components/upcomingEvent';
import ConnectionsCard from '../components/connectionCard';
import { GENERATED_CONNECTIONS } from '../utils/constants';
import Toast from 'react-native-simple-toast';
import MyStats from '../components/myStats';
import FloatingScannerCTA from '../components/floatingScannerCTA';
import YoutubePlayer from 'react-native-youtube-iframe';
import SessionListItem from '../components/sessionListItem';
import Card from '../components/card';
import { COLORS, TEXT_SIZES } from '../utils/constants';
const HomeSessions = () => {
  return (
    <>
      <View style={styles.sessionHeadWrapper}>
        <Text style={styles.label}>Sessions</Text>
        <Text
          style={styles.labelViewAll}
          onPress={() => Alert.alert('View All')}
        >
          See more
        </Text>
      </View>
      <Card style={styles.card}>
        <SessionListItem
          title="Opening Keynote: The Future of Innovation"
          time="10:00 AM - 11:00 AM"
          onPress={() => Alert.alert('Item Pressed')}
          speakers={[
            {
              name: 'Dr. A',
              designation: 'Chief Innovation Officer',
              company: 'Innovatech Solutions',
            },
          ]}
          workshopNo="Workshop NO : 01"
          status="Ongoing"
        />
      </Card>
      <Card style={styles.card}>
        <SessionListItem
          title="Opening Keynote: The Future of Innovation"
          time="10:00 AM - 11:00 AM"
          onPress={() => Alert.alert('Item Pressed')}
          speakers={[
            {
              name: 'Dr. A',
              designation: 'Chief Innovation Officer',
              company: 'Innovatech Solutions',
            },
          ]}
          workshopNo="Workshop NO : 01"
          status="Ongoing"
        />
      </Card>
      <Card style={styles.card}>
        <SessionListItem
          title="Opening Keynote: The Future of Innovation"
          time="10:00 AM - 11:00 AM"
          onPress={() => Alert.alert('Item Pressed')}
          speakers={[
            {
              name: 'Dr. A',
              designation: 'Chief Innovation Officer',
              company: 'Innovatech Solutions',
            },
          ]}
          workshopNo="Workshop NO : 01"
          status="Ongoing"
        />
      </Card>
      <Card style={styles.card}>
        <SessionListItem
          title="Opening Keynote: The Future of Innovation"
          time="10:00 AM - 11:00 AM"
          onPress={() => Alert.alert('Item Pressed')}
          speakers={[
            {
              name: 'Dr. A',
              designation: 'Chief Innovation Officer',
              company: 'Innovatech Solutions',
            },
          ]}
          workshopNo="Workshop NO : 01"
          status="Ongoing"
        />
      </Card>
    </>
  );
};

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
    <View style={styles.container}>
      <ScrollView style={styles.homeScreenContainer}>
        <HomeHeader
          userName="Hello, Arafat"
          welcomeMessage="Welcome !"
          profileImage="https://reactjs.org/logo-og.png"
          bellIcon="your_bell_icon_source"
        />
        <YoutubePlayer
          height={200}
          play={playing}
          videoId={'iee2TATGMyI'}
          onChangeState={onStateChange}
        />
        <UpcomingEvent eventDate={new Date(2025, 8, 4, 2, 31, 0)} />
        <QuickActionMenu />
        <HomeSessions />
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
  card: {
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  label: {
    fontSize: TEXT_SIZES.md,
    fontFamily: 'Roboto-Bold',
    color: COLORS.black,
  },
  labelViewAll: {
    fontSize: TEXT_SIZES.md,
    fontFamily: 'Roboto-Bold',
    color: COLORS.primary,
  },
  sessionHeadWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
