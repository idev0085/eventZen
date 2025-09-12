import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  TimerWait,
  COLORS,
  Timer,
  Calander,
  Location,
  Workshop,
  SessionUpcoming,
  SessionCompleted,
} from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import Icon from '../components/icon';
import Button from '../components/ui/button';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
import LoadingOverlay from '../components/loadingOverlay';
import { useSessionDetails } from '../hooks/useApi';

const ICON_SIZE = 20;

const OverView = ({ session }) => {
  const BADGE_BG_COLOR =
    session?.status === 'Completed'
      ? COLORS.badgeGreen
      : session?.status === 'Upcoming'
      ? COLORS.badgeYellow
      : session?.status === 'Ongoing'
      ? COLORS.primary
      : COLORS.primary;
  const BADGE_ICON =
    session?.status === 'Completed' ? (
      <SessionCompleted height={ICON_SIZE} width={ICON_SIZE} />
    ) : session?.status === 'Upcoming' ? (
      <SessionUpcoming height={ICON_SIZE} width={ICON_SIZE} />
    ) : session?.status === 'Ongoing' ? (
      <TimerWait height={ICON_SIZE} width={ICON_SIZE} />
    ) : (
      <TimerWait height={ICON_SIZE} width={ICON_SIZE} />
    );
  const STATUS_TEXT_COLOR =
    session?.status === 'Completed'
      ? styles.statusTextGreen
      : session?.status === 'Upcoming'
      ? styles.statusTextUpcoming
      : session?.status === 'Ongoing'
      ? styles.statusText
      : styles.statusText;

  const sessionMeta = [
    {
      icon: <Calander width={ICON_SIZE} height={ICON_SIZE} />,
      // Assuming start_time is an ISO string. You might need a date formatting utility.
      text: session?.start_time
        ? new Date(session.start_time).toLocaleDateString()
        : 'N/A',
    },
    {
      icon: <Timer width={ICON_SIZE} height={ICON_SIZE} />,
      text: formatTimeRange(session?.start_time, session?.end_time),
    },
    {
      icon: <Location width={ICON_SIZE} height={ICON_SIZE} />,
      text: session?.location || 'N/A',
    },
    {
      icon: <Workshop width={ICON_SIZE} height={ICON_SIZE} />,
      text: session?.workshop_no || 'N/A',
    },
  ];

  return (
    <View style={{ marginTop: 10 }}>
      <CustomText
        style={STATUS_TEXT_COLOR}
        badge={true}
        bgColor={BADGE_BG_COLOR}
        icon={BADGE_ICON}
      >
        {session?.status}
      </CustomText>
      <CustomText style={styles.textOverviewHeading}>
        {session?.title}
      </CustomText>

      {sessionMeta?.map((item, index) => {
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
        title={'Add to Favorite'}
        variant={'primary'}
        onPress={() => Alert.alert('Development Work in progress')}
        textStyle={styles.footerBtnText}
      />

      <Button
        title="Create Agenda"
        variant={'secondary'}
        onPress={() => Alert.alert('Development Work in progress')}
        textStyle={styles.footerBtnText}
      />
    </View>
  );
};

export default function SessionsDetailsScreen() {
  const route = useRoute();
  const { sessionId } = route.params as { sessionId: number };

  const { data: session, isLoading, isError } = useSessionDetails(sessionId);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingOverlay visible={true} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BackHeader title="Session Details" />
        <CustomText>Could not fetch session details.</CustomText>
      </View>
    );
  }

  return (
    <>
      <BackHeader title="Session Details" />
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <OverView session={session} />
          {session.description && (
            <Details type={'description'} context={session.description} />
          )}
          {session.demoes && (
            <Details type={'demos'} context={session.demoes} />
          )}
          {session.panels && (
            <Details type={'panels'} context={session.panels} />
          )}
          {session.speakers?.length > 0 && (
            <Speakers type={'speakers'} list={session.speakers} />
          )}
          {session.status !== 'Completed' && <FooterBtn />}
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
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
  textSpeakerDesignation: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: COLORS.primary,
    marginTop: 5,
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
