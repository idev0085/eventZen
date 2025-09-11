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
  apiCall,
} from '../utils/helpers';
import Toast from 'react-native-simple-toast';
import MyStats from '../components/myStats';
import FloatingScannerCTA from '../components/floatingScannerCTA';
import YoutubePlayer from 'react-native-youtube-iframe';
import SessionListItem from '../components/sessionListItem';
import Card from '../components/card';
import { ONESIGNAL_API_KEY, BASE_URL } from '../config';
import LoadingOverlay from '../components/loadingOverlay';
import { useHomeData, useProfile, useUpdateOneSignal } from '../hooks/useApi';
import { getToken } from '../utils/tokenManager';
const HomeSessions = ({ ...props }) => {
  return (
    <>
      <View style={styles.sessionHeadWrapper}>
        <Text style={styles.label}>Sessions</Text>
        <Text
          style={styles.labelViewAll}
          onPress={() =>
            props.navigation.navigate('SessionsScreen', { routeFrom: 'Home' })
          }
        >
          See more
        </Text>
      </View>
      {props?.data?.home_sessions?.slice(0, 4).map(session => (
        <Card style={styles.card} key={session.id}>
          <SessionListItem
            title={session?.title}
            time={formatTimeRange(session.start_time, session.end_time)}
            onPress={() =>
              props.navigation.navigate('SessionsDetailsScreen', {
                id: session.id,
              })
            }
            speakers={session?.speakers}
            workshopNo={session?.workshop_no}
            status="Ongoing"
            my_agenda=""
          />
        </Card>
      ))}
    </>
  );
};

const HomeScreen = ({ ...props }) => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(ONESIGNAL_API_KEY);
  OneSignal.Notifications.requestPermission(true);
  OneSignal.Notifications.addEventListener('click', event => {
    //Alert.alert('Notification Clicked', JSON.stringify(event));
    props.navigation.navigate('NotificationsScreen');
  });

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

  const updateOneSignal = async (obj: object) => {
    const token = await getToken();
    try {
      const response = await apiCall(
        BASE_URL + '/api/onesignal',
        'POST',
        obj,
        token,
      );
      console.log('OneSignal update response:', response);
    } catch (error) {
      console.log('error', error);
    } finally {
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const userID = await OneSignal.User.getOnesignalId();
      console.log('OneSignal User ID:', userID);
      let obj = {
        onesignal_userid: userID,
      };
      console.log('OneSignal update payload:', obj);
      updateOneSignal(obj);
      // const { data: onesignalResponse } = useUpdateOneSignal(obj);
      // console.log('OneSignal update response:', onesignalResponse);
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

  const VIDEO = getVideoId(homeData?.banner?.videoUrl);
  const upcomingEventDate = parseISODateString(
    homeData?.upcomingEvent?.startDateTime,
  );

  console.log('Home Data:', homeData);
  console.log('Profile Data:', profileData);

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
              navigation={props.navigation}
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
            <QuickActionMenu navigations={props.navigation} />
            {homeData?.home_sessions?.length > 0 && (
              <HomeSessions data={homeData} navigation={props.navigation} />
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
