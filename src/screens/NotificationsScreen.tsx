import React, { use, useEffect, useState } from 'react';
import { Alert, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { COLORS } from '../utils/constants';

import SessionListItem from '../components/sessionListItem';
import { DrawerLayoutAndroid, ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';

import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
import LoadingOverlay from '../components/loadingOverlay';
import UserList from '../components/userList';

export default function NotificationsScreen({ ...props }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      readAll();
    };
    fetchData();
  }, []);
  const readAll = async () => {
    const token = await getToken();
    try {
      const response = await apiCall(
        BASE_URL + '/api/get-notifications',
        'GET',
        undefined,
        token,
      );
      setApiData(response);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  const rightFunction = async () => {
    const token = await getToken();
    setLoading(true);
    try {
      await apiCall(
        BASE_URL + '/api/notification-read-all',
        'GET',
        undefined,
        token,
      );
      readAll();
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  const viewSpeaker = () => {
    props.navigation.navigate('SpeakersScreen');
  };
  //console.log('apiData', apiData, getToken());
  return (
    <>
      <BackHeader
        title="Notification"
        showBtn={true}
        rightFunction={rightFunction}
        rightLabel={'Read All'}
      />
      <ScrollView style={styles.container}>
        {loading ? (
          <LoadingOverlay visible={loading} />
        ) : (
          apiData?.map((value, index) => (
            <UserList
              key={index}
              notificationData={value}
              viewSpeaker={viewSpeaker}
            />
          ))
        )}
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
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingLeft: 30,
    borderRadius: 10,
    backgroundColor: COLORS.background,
  },
  cardOngoing: {
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    paddingLeft: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  cardDisable: {
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: COLORS.background,
    paddingLeft: 30,
    borderRadius: 10,
  },
});
