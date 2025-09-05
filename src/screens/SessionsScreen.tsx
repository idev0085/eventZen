import React, { use, useEffect, useState } from 'react';
import { Alert, StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/constants';

import SessionListItem from '../components/sessionListItem';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';

import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
export default function SessionsScreen({ ...props }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await getToken();
      try {
        const response = await apiCall(
          BASE_URL + '/api/sessions',
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
    fetchData();
  }, []);
  //console.log('apiData', apiData, getToken());
  return (
    <>
      <BackHeader title="Session" showBtn={false} />
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          apiData?.map((day, index) => (
            <View key={day.date || index}>
              <CustomText
                style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}
              >
                {day?.date}
              </CustomText>
              {day?.session_list?.map(session => (
                <Card
                  key={session.id}
                  style={
                    session?.status === 'Ongoing'
                      ? styles.cardOngoing
                      : session?.status === 'Completed'
                      ? styles.cardDisable
                      : styles.card
                  }
                >
                  <SessionListItem
                    title={session?.title}
                    time={formatTimeRange(
                      session?.start_time,
                      session?.end_time,
                    )}
                    onPress={() =>
                      props.navigation.navigate('SessionsDetailsScreen', {
                        sessionId: session.id,
                      })
                    }
                    speakers={session?.speakers}
                    workshopNo={session?.workshop_no}
                    status={session?.status}
                  />
                </Card>
              ))}
            </View>
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
    width: '90%',
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
