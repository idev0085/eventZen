import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, View, Text } from 'react-native';
import HomeHeader from '../components/homeHeader';
import QuickActionMenu from '../components/quickActionMenu';
import UpcomingEvent from '../components/upcomingEvent';
import ConnectionsCard from '../components/connectionCard';
import { GENERATED_CONNECTIONS, COLORS, TEXT_SIZES } from '../utils/constants';
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
import { getToken } from '../utils/tokenManager';

const MOCK_DATA_HOME = {
  banner: {
    id: 1,
    title: 'Canadian sme Summit 2025',
    description:
      'Voluptas dolore laboriosam perspiciatis accusamus. Odit itaque deleniti necessitatibus mollitia. Autem quaerat quia rem veritatis velit eaque.',
    location: '9418 Boyle ViewBreitenbergtown, MT 38801',
    imageUrl:
      'https://sme.nodejsdapldevelopments.com/storage/events/2025-09-04-2301194973-1756981982.png?v=1756983627',
    videoUrl: 'https://youtu.be/t0Q2otsqC4I',
    startTime: '2025-09-03T00:00:00+05:30',
    endTime: '2125-09-03T00:00:00+05:30',
    status: 'published',
  },
  upcomingEvent: {
    id: 7,
    title: 'AI & Machine Learning Workshop',
    description: 'Quia ut aut incidunt molestiae id velit laboriosam.',
    startDateTime: '2025-09-06T11:00:00+05:30',
    status: 'upcoming',
  },
  home_sessions: [
    {
      id: 4,
      title: 'Global Sustainability Roundtable',
      description:
        'Minima at tenetur laboriosam aspernatur. Sed et quia voluptatem ex rerum aliquid sed enim.',
      keynote: 'Veritatis voluptas repudiandae quas aut.',
      demoes:
        'Molestias et quidem ut non minima dolorem modi vero. Rerum iure molestiae rerum commodi dolor aut voluptas.',
      panels:
        'In sunt eum et explicabo a nam. Eius dolores eius animi unde deserunt.',
      start_time: '2025-09-04T11:00:00+05:30',
      end_time: '2025-09-04T12:00:00+05:30',
      workshop_no: 'Workshop NO : 04',
      location: 'Thompsonland, Chad',
      status: 'published',
      speakers: [
        {
          name: 'Caleb',
        },
        {
          name: 'Leah',
        },
      ],
      isFavorite: true,
    },
    {
      id: 6,
      title: 'Startup & Investment Pitch Day',
      description:
        'Voluptatum rerum laboriosam fugiat laudantium aut consequatur sed.',
      keynote:
        'Temporibus soluta placeat sequi deleniti sint veritatis laudantium.',
      demoes:
        'Delectus nesciunt officiis facere. Officiis magnam inventore molestias recusandae iusto maiores.',
      panels: 'Eum iure earum rerum saepe. Sapiente autem eaque sit.',
      start_time: '2025-09-04T15:00:00+05:30',
      end_time: '2025-09-04T16:00:00+05:30',
      workshop_no: 'Workshop NO : 06',
      location: 'South Orphabury, Saint Lucia',
      status: 'published',
      speakers: [
        {
          name: 'Hannah',
        },
        {
          name: 'Caleb',
        },
      ],
      isFavorite: true,
    },
  ],

  home_connections: [
    {
      id: 16,
      name: 'Amelia Davis',
      avatarUrl: 'https://sme.nodejsdapldevelopments.com/images/default.png',
    },
    {
      id: 17,
      name: 'Lucas Martinez',
      avatarUrl: 'https://sme.nodejsdapldevelopments.com/images/default.png',
    },
    {
      id: 18,
      name: 'Sophia Rodriguez',
      avatarUrl: 'https://sme.nodejsdapldevelopments.com/images/default.png',
    },
  ],
  myStats: {
    totalAgents: 5,
    totalConnections: 30,
    totalSessionAttendee: 6,
  },
  notifications: {
    count: 0,
    hasNew: true,
    data: [],
  },
};
const MOCK_DATA_PROFILE = {
  success: true,
  message: 'successful',
  id: 27,
  first_name: 'Henry',
  lastname: 'Roy',
  name: 'Henry Roy',
  email: 'henry.roy@example.com',
  phone: '5132150156',
  imageUrl: 'https://sme.nodejsdapldevelopments.com/images/default.png',
  designation: 'Computer',
  bio: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\r\n\r\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
  tags: ['Event', 'CloudTrends', 'Dataseecurity'],
  my_qr_code:
    'https://sme.nodejsdapldevelopments.com/qrcodes/user_1756983539.png',
  company_name: 'Orn Inc',
  company_email: 'rubye.effertz@block.com',
  company_phone: '+17545917756',
  image_url: 'https://sme.nodejsdapldevelopments.com/images/default.png',
  roles: ['Admin', 'Sponsors', 'Attendee', 'Speaker'],
  company_about_page: 'http://sme.nodejsdapldevelopments.com/app/page/about',
  company_location_page:
    'http://sme.nodejsdapldevelopments.com/app/page/location',
  company_privacy_policy_page:
    'http://sme.nodejsdapldevelopments.com/app/page/privacy',
  company_terms_of_service_page:
    'http://sme.nodejsdapldevelopments.com/app/page/terms',
};

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
      {MOCK_DATA_HOME?.home_sessions?.map(session => (
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

  const VIDEO = getVideoId(MOCK_DATA_HOME?.banner?.videoUrl);
  const upcomingEventDate = parseISODateString(
    MOCK_DATA_HOME?.upcomingEvent?.startDateTime,
  );
  console.log(
    'MOCK_DATA_HOME?.banner?.videoUrl',
    MOCK_DATA_HOME?.banner?.videoUrl,
  );
  console.log('VIDEO', VIDEO);

  async function findToken() {
    const token = await getToken();
    console.log('🚀 ~ findToken ~ token:', token);
  }

  useEffect(() => {
    findToken();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.homeScreenContainer}>
        <HomeHeader
          userName={MOCK_DATA_PROFILE?.name}
          welcomeMessage="Welcome !"
          profileImage={MOCK_DATA_PROFILE?.imageUrl}
          hasNewNotification={MOCK_DATA_HOME?.notifications?.hasNew}
        />
        {VIDEO && (
          <YoutubePlayer
            height={200}
            play={playing}
            videoId={VIDEO}
            onChangeState={onStateChange}
          />
        )}

        {upcomingEventDate && <UpcomingEvent eventDate={upcomingEventDate} />}
        <QuickActionMenu />
        {MOCK_DATA_HOME?.home_sessions?.length > 0 && <HomeSessions />}
        {MOCK_DATA_HOME?.home_connections?.length > 0 && (
          <ConnectionsCard
            connections={MOCK_DATA_HOME?.home_connections}
            onStartNetworking={handleOnStartNetworking}
          />
        )}
        {MOCK_DATA_HOME?.myStats && <MyStats data={MOCK_DATA_HOME?.myStats} />}
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
