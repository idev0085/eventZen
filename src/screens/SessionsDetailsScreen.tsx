import React, { useState, useEffect, use } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
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
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
const FooterBtn = ({ ...props }) => {
  const favText = props.isFav ? 'Remove from Favorite' : 'Add to Favorite';
  const agendaText =
    props.isInAgenda && props.agenda !== '' ? 'Update Agenda' : 'Create Agenda';
  return (
    <View style={styles.footerBtnWrapper}>
      <View style={styles.footerContainer}>
        <Button
          title={favText}
          variant={'primary'}
          onPress={props.addFav}
          textStyle={styles.footerBtnText}
        />

        <Button
          title={agendaText}
          variant={'secondary'}
          onPress={props.togglenModalCreateAgenda}
          textStyle={styles.footerBtnText}
        />
      </View>
    </View>
  );
};

export default function SessionsDetailsScreen() {
  const [isFav, setIsFav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [agendaText, setAgendaText] = useState('');
  const route = useRoute();
  const { sessionId } = route.params as { sessionId: number };
  const { data: session, isLoading, isError } = useSessionDetails(sessionId);

  useEffect(() => {
    console.log('Session ID:', sessionId);
    setIsFav(session?.isFavorite);
    setAgendaText(session?.agenda);
  }, [session]);

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

  const addFav = async (sessionId: number) => {
    const token = await getToken();
    try {
      const response = await apiCall(
        BASE_URL + `/api/sessions/${sessionId}/favourite`,
        'GET',
        undefined,
        token,
      );
      Toast.show(response?.message, Toast.LONG);
      setIsFav(!isFav);
      console;
    } catch (error) {
      console.log('error', error);
    }
  };

  const createAgenda = async (sessionId: number, agendaText: string) => {
    const token = await getToken();
    const obj = {
      message: agendaText,
      isInAgenda: true,
    };
    try {
      const response = await apiCall(
        BASE_URL + `/api/sessions/${sessionId}/agenda`,
        'POST',
        obj,
        token,
      );
      Toast.show(response?.message, Toast.LONG);
    } catch (error) {
      console.log('error', error);
    } finally {
      setOpenModal(false);
      setAgendaText('');
    }
  };

  const togglenModalCreateAgenda = () => {
    // Alert.alert('Development Work in progress');
    setOpenModal(!openModal);
  };

  const handleSaveAgenda = () => {
    if (!agendaText.trim()) {
      Toast.show('Agenda cannot be empty.', Toast.SHORT);
      return;
    }
    createAgenda(sessionId, agendaText);
  };

  return (
    <>
      <BackHeader title="Session Details" />
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <OverView session={session} />
          {session?.description && (
            <Details type={'description'} context={session.description} />
          )}
          {session?.demoes && (
            <Details type={'demos'} context={session.demoes} />
          )}
          {session?.panels && (
            <Details type={'panels'} context={session.panels} />
          )}
          {session?.speakers?.length > 0 && (
            <Speakers type={'speakers'} list={session.speakers} />
          )}
          {session?.status !== 'Completed' && (
            <FooterBtn
              addFav={() => addFav(sessionId)}
              isFav={isFav}
              togglenModalCreateAgenda={togglenModalCreateAgenda}
              isInAgenda={session?.isInAgenda}
              agenda={session?.agenda}
            />
          )}
        </Card>
      </ScrollView>

      <Modal
        isVisible={openModal}
        onBackdropPress={togglenModalCreateAgenda}
        useNativeDriver
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={togglenModalCreateAgenda}
          >
            <Text style={{ fontSize: 20, color: COLORS.primary }}>X</Text>
          </TouchableOpacity>

          <CustomText style={styles.textHeadngCreateAgenda}>
            Create Agenda
          </CustomText>
          <TextInput
            style={styles.input}
            placeholder={'Write Your Agenda'}
            value={agendaText}
            onChangeText={setAgendaText}
            multiline
            numberOfLines={4}
            underlineColorAndroid="transparent"
          />

          <View style={styles.footerBtnWrapperModal}>
            <Button
              title={'Cancel'}
              variant={'primary'}
              onPress={togglenModalCreateAgenda}
              textStyle={styles.footerBtnTextBlack}
              style={styles.footerBtnWrapperContainerWhite}
            />

            <Button
              title="Save"
              variant={'secondary'}
              onPress={handleSaveAgenda}
              textStyle={styles.footerBtnText}
              style={styles.footerBtnWrapperContainer}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  card: {
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    // backgroundColor: 'red',
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    flex: 1,
    alignItems: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  footerBtnText: {
    color: COLORS.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '500',
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
    marginLeft: 5,
  },
  statusTextUpcoming: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.warning,
    marginLeft: 5,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    // alignItems: 'center',
    width: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    zIndex: 1,
  },
  textHeadng: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    fontFamily: 'Roboto-Regular',
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  footerBtnWrapperModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  textHeadngCreateAgenda: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
    marginTop: 10,
  },
  footerBtnTextBlack: {
    color: COLORS.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  footerBtnWrapperContainerWhite: {
    width: '40%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
  },
  footerBtnWrapperContainer: {
    width: '40%',
    borderRadius: 10,
  },
});
