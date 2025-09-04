import React, { useState, useCallback, useRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  TimerWait,
  COLORS,
  Timer,
  Calander,
  Location,
  Workshop,
  SessionUpcoming,
  SessionCompleted,
} from '../utils/constants';
import UserDetails from '../components/userDetails';
import ContactDetails from '../components/contactDetails';
import AddNote from '../components/addNote';
import ListItem from '../components/listItem';
import SessionListItem from '../components/sessionListItem';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import TextBox from '../components/ui/textBox';
import SearchUI from '../components/Search';
import CustomText from '../components/ui/text';
import Icon from '../components/icon';
import YoutubePlayer from 'react-native-youtube-iframe';
import Button from '../components/ui/button';
import BackHeader from '../components/BackHeader';
const status = 'Completed';
const ICON_SIZE = 20;
const SESSION_META = [
  {
    icon: <Calander width={ICON_SIZE} height={ICON_SIZE} />,
    text: 'Fri, Aug 08, 2025',
  },
  {
    icon: <Timer width={ICON_SIZE} height={ICON_SIZE} />,
    text: '11:00 AM - 01:00 PM',
  },
  {
    icon: <Location width={ICON_SIZE} height={ICON_SIZE} />,
    text: 'Manhattan Club',
  },
  {
    icon: <Workshop width={ICON_SIZE} height={ICON_SIZE} />,
    text: 'Workshop NO 02',
  },
];
const SPEAKERS = [
  {
    name: 'Ashton Parter',
    designation: 'CEO',
    company: 'Innovatech Solutions',
    image: 'https://reactjs.org/logo-og.png',
  },
  {
    name: 'Ashton Parter',
    designation: 'CEO',
    company: 'Innovatech Solutions',
    image: 'https://reactjs.org/logo-og.png',
  },
];
const OverView = () => {
  // const [playing, setPlaying] = useState(false);

  // const onStateChange = useCallback(state => {
  //   if (state === 'ended') {
  //     setPlaying(false);
  //     Alert.alert('video has finished playing!');
  //   }
  // }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying(prev => !prev);
  // }, []);
  const BADGE_BG_COLOR =
    status === 'Completed'
      ? COLORS.badgeGreen
      : status === 'Upcoming'
      ? COLORS.badgeYellow
      : status === 'Ongoing'
      ? COLORS.primary
      : COLORS.primary;
  const BADGE_ICON =
    status === 'Completed' ? (
      <SessionCompleted height={ICON_SIZE} width={ICON_SIZE} />
    ) : status === 'Upcoming' ? (
      <SessionUpcoming height={ICON_SIZE} width={ICON_SIZE} />
    ) : status === 'Ongoing' ? (
      <TimerWait height={ICON_SIZE} width={ICON_SIZE} />
    ) : (
      <TimerWait height={ICON_SIZE} width={ICON_SIZE} />
    );
  const STATUS_TEXT_COLOR =
    status === 'Completed'
      ? styles.statusTextGreen
      : status === 'Upcoming'
      ? styles.statusTextUpcoming
      : status === 'Ongoing'
      ? styles.statusText
      : styles.statusText;
  return (
    <View style={{ marginTop: 10 }}>
      {/* <YoutubePlayer
        height={300}
        play={playing}
        videoId={'iee2TATGMyI'}
        onChangeState={onStateChange}
      /> */}

      <CustomText
        style={STATUS_TEXT_COLOR}
        badge={true}
        bgColor={BADGE_BG_COLOR}
        icon={BADGE_ICON}
      >
        {status}
      </CustomText>
      <CustomText style={styles.textOverviewHeading}>
        Women in business conference
      </CustomText>

      {SESSION_META?.map((item, index) => {
        return (
          <View key={index} style={styles.sessionMeta}>
            {item.icon}
            <CustomText style={styles.textOverViewIconLabel}>
              {item.text}
            </CustomText>
          </View>
        );
      })}
    </View>
  );
};
const Details = ({ type, context }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <CustomText style={styles.textDetailsType}>
        {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
      </CustomText>
      <CustomText style={styles.textDetailsContext}>{context}</CustomText>
    </View>
  );
};
const Speakers = ({ type, list }) => {
  return (
    <View style={{ marginTop: 20, marginBottom: 20 }}>
      {list?.map((item, index) => {
        return (
          <View key={index} style={styles.sessionMeta}>
            <Icon
              source={{ uri: item?.image }}
              size={60}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
            <View style={{ marginLeft: 10 }}>
              <CustomText style={styles.textSpeakerName}>
                {item?.name}
              </CustomText>
              <CustomText style={styles.textSpeakerDesignation}>
                {item?.designation}
              </CustomText>
            </View>
          </View>
        );
      })}
    </View>
  );
};
const FooterBtn = () => {
  return (
    <View style={styles.footerBtnWrapper}>
      <Button
        title="Add to Favorite"
        variant={'primary'}
        onPress={() => {}}
        textStyle={styles.footerBtnText}
      />

      <Button
        title="Create Agenda"
        variant={'secondary'}
        onPress={() => {}}
        textStyle={styles.footerBtnText}
      />
    </View>
  );
};
export default function SessionsDetailsScreen() {
  return (
    <>
      <BackHeader title="Session Details" />
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <OverView />

          <Details
            type={'desciption'}
            context={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.`}
          />

          <Details
            type={'demos'}
            context={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.`}
          />

          <Details
            type={'panels'}
            context={`Contrary to popular belief, Lorem Ipsum is not simply random text.`}
          />

          <Speakers type={'speakers'} list={SPEAKERS} />

          {status !== 'Completed' && <FooterBtn />}
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  sessionMeta: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    // width: '50%',
  },
  speakerImage: {
    // height: 60,
    // width: 60,
    // borderRadius: 30,
    // backgroundColor: 'red',
  },
  textSpeakerName: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
  textSpeakerDesignation: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: COLORS.primary,
  },
  textDetailsType: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
  },
  textDetailsContext: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textPrimary,
    marginTop: 5,
  },
  textOverviewHeading: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginTop: 5,
  },
  textOverViewIconLabel: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  footerBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerBtnText: {
    color: COLORS.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    padding: 5,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
  statusTextGreen: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.success,
  },
  statusTextUpcoming: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.warning,
  },
});
