import React from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import SessionListItem from '../components/sessionListItem';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
import {
  formatTimeRange,
  getFullNameFormatDate,
  trimText,
} from '../utils/helpers';
import LoadingOverlay from '../components/loadingOverlay';
import { useSessions } from '../hooks/useApi';

export default function MyAgendaScreen({ ...props }) {
  const [myAgenda, setMyAgenda] = React.useState([]);
  const {
    data: sessionData,
    isLoading,
    refetch: refetchSessionData,
    isRefetching: isRefetchingHome,
  } = useSessions();
  React.useEffect(() => {
    if (sessionData && sessionData.length > 0) {
      const favSessions = sessionData
        .map(day => {
          return {
            ...day,
            session_list: day.session_list.filter(
              session =>
                session.isFavorite === true && session.my_agenda !== '',
            ),
          };
        })
        .filter(day => day.session_list.length > 0);
      setMyAgenda(favSessions);
    } else {
      setMyAgenda([]);
    }
  }, [sessionData]);

  return (
    <>
      <BackHeader title="My agenda" showBtn={true} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingHome}
            onRefresh={refetchSessionData}
            tintColor={COLORS.primary}
          />
        }
      >
        {isLoading ? (
          <LoadingOverlay visible={true} />
        ) : myAgenda.length > 0 ? (
          myAgenda?.map((day, index) => (
            <View key={day.date || index}>
              <CustomText
                style={{
                  fontSize: TEXT_SIZES.md,
                  fontWeight: 'bold',
                  margin: 10,
                }}
              >
                {getFullNameFormatDate(day?.date)}
              </CustomText>
              {day?.session_list?.map(session => (
                <Card key={session.id} style={styles.cardOngoing}>
                  <SessionListItem
                    title={session?.title}
                    time={formatTimeRange(
                      session?.start_time,
                      session?.end_time,
                    )}
                    onPress={() =>
                      props.navigation.navigate('MyAgendaDetailsScreen', {
                        sessionId: session.id,
                      })
                    }
                    speakers={session?.speakers}
                    workshopNo={session?.workshop_no}
                    status={session?.status}
                    isFavorite={session?.isFavorite}
                    my_agenda={trimText(
                      'Lorem Ipsum is simply dummy te...',
                      10,
                    )}
                  />
                </Card>
              ))}
            </View>
          ))
        ) : (
          <CustomText style={styles.noResultsText}>No data found.</CustomText>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
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
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
