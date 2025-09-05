import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import HomeHeader from '../components/homeHeader';
import QuickActionMenu from '../components/quickActionMenu';
import UpcomingEvent from '../components/upcomingEvent';
import ConnectionsCard from '../components/connectionCard';
import { GENERATED_CONNECTIONS, COLORS, TEXT_SIZES } from '../utils/constants';
import {
  getVideoId,
  parseISODateString,
  formatTimeRange,
  apiCall,
} from '../utils/helpers';
import Toast from 'react-native-simple-toast';
import MyStats from '../components/myStats';
import FloatingScannerCTA from '../components/floatingScannerCTA';
import YoutubePlayer from 'react-native-youtube-iframe';
import SessionListItem from '../components/sessionListItem';
import Card from '../components/card';
import { BASE_URL } from '../config';
import { getToken } from '../utils/tokenManager';

const HomeSessions = ({ ...props }) => {
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
      {props?.data?.home_sessions?.map(session => (
        <Card style={styles.card} key={session.id}>
          <SessionListItem
            title={session?.title}
            time={formatTimeRange(session.start_time, session.end_time)}
            onPress={() => Alert.alert('Item Pressed')}
            speakers={session?.speakers}
            workshopNo={session?.workshop_no}
            status="Ongoing"
          />
        </Card>
      ))}
    </>
  );
};

const HomeScreen = ({ ...props }) => {
  const [apiDataHome, setApiDataHome] = useState({});
  const [apiDataProfile, setApiDataProfile] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await getToken();
      try {
        const response = await apiCall(
          BASE_URL + '/api/home',
          'POST',
          undefined,
          token,
        );
        console.log('================>', BASE_URL + '/api/home');
        console.log('response', response);
        // Assuming the API returns an object with a 'data' array)
        setApiDataHome(response);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }

      try {
        const response = await apiCall(
          BASE_URL + '/api/profile',
          'GET',
          undefined,
          token,
        );
        // Assuming the API returns an object with a 'data' array
        setApiDataProfile(response);
      } catch (error) {
        console.log('error fetching connections', error);
      } finally {
      }
    };
    fetchData();
  }, []);

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

  const VIDEO = getVideoId(apiDataHome?.banner?.videoUrl);
  const upcomingEventDate = parseISODateString(
    apiDataHome?.upcomingEvent?.startDateTime,
  );
  // console.log(
  //   'MOCK_DATA_HOME?.banner?.videoUrl',
  //   MOCK_DATA_HOME?.banner?.videoUrl,
  // );
  // console.log('VIDEO', VIDEO);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.homeScreenContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <>
            <HomeHeader
              userName={apiDataProfile?.name}
              welcomeMessage="Welcome !"
              profileImage={apiDataProfile?.imageUrl}
              hasNewNotification={apiDataHome?.notifications?.hasNew}
            />
            {VIDEO && (
              <YoutubePlayer
                height={200}
                play={playing}
                videoId={VIDEO}
                onChangeState={onStateChange}
              />
            )}

            {upcomingEventDate && (
              <UpcomingEvent eventDate={upcomingEventDate} />
            )}
            <QuickActionMenu />
            {apiDataHome?.home_sessions?.length > 0 && (
              <HomeSessions data={apiDataHome} />
            )}
            {apiDataHome?.home_connections?.length > 0 && (
              <ConnectionsCard
                connections={apiDataHome?.home_connections}
                onStartNetworking={handleOnStartNetworking}
              />
            )}
            {apiDataHome?.myStats && <MyStats data={apiDataHome?.myStats} />}
          </>
        )}
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
    // marginHorizontal: 10,
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
