import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import HomeHeader from '../components/homeHeader';
import QuickActionMenu from '../components/quickActionMenu';
import UpcomingEvent from '../components/upcomingEvent';
import ConnectionsCard from '../components/connectionCard';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import {
  getVideoId,
  parseISODateString,
  formatTimeRange,
} from '../utils/helpers';
import Toast from 'react-native-simple-toast';
import MyStats from '../components/myStats';
import FloatingScannerCTA from '../components/floatingScannerCTA';
import YoutubePlayer from 'react-native-youtube-iframe';
import SessionListItem from '../components/sessionListItem';
import Card from '../components/card';
import { ONESIGNAL_API_KEY } from '../config';
import LoadingOverlay from '../components/loadingOverlay';
import { useHomeData, useProfile } from '../hooks/useApi';
import { useAuthStore } from '../stores/authStore';

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
      {props?.data?.home_sessions?.slice(0, 4).map(session => (
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
  const {
    data: homeData,
    isLoading: isHomeLoading,
    refetch: refetchHomeData,
    isRefetching: isRefetchingHome,
  } = useHomeData();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isSuccess,
  } = useProfile();

  // Zustand store
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const fetchData = async () => {
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      OneSignal.initialize(ONESIGNAL_API_KEY);
      OneSignal.Notifications.requestPermission(true);
      const userID = await OneSignal.User.getOnesignalId();
      console.log('OneSignal User ID:', userID);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isSuccess && profileData) {
      setUser(profileData);
    }
  }, [isSuccess, profileData, setUser]);

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

  const VIDEO = getVideoId(homeData?.banner?.videoUrl);
  const upcomingEventDate = parseISODateString(
    homeData?.upcomingEvent?.startDateTime,
  );

  const isLoading = isHomeLoading || isProfileLoading;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.homeScreenContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingHome}
            onRefresh={refetchHomeData}
            tintColor={COLORS.primary}
          />
        }
      >
        {isLoading ? (
          <LoadingOverlay visible={true} />
        ) : (
          <>
            <HomeHeader
              userName={profileData?.name}
              welcomeMessage="Welcome !"
              profileImage={profileData?.imageUrl}
              hasNewNotification={homeData?.notifications?.hasNew}
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
            {homeData?.home_sessions?.length > 0 && (
              <HomeSessions data={homeData} />
            )}
            {homeData?.home_connections?.length > 0 && (
              <ConnectionsCard
                connections={homeData?.home_connections}
                onStartNetworking={handleOnStartNetworking}
              />
            )}
            {homeData?.myStats && <MyStats data={homeData?.myStats} />}
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
