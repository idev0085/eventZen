import React from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import SessionListItem from '../components/sessionListItem';
import Card from '../components/card';
import BackHeader from '../components/BackHeader';
import { formatTimeRange, getFullNameFormatDate } from '../utils/helpers';
import LoadingOverlay from '../components/loadingOverlay';
import { useSessions } from '../hooks/useApi';

export default function FavouriteSessionScreen({ navigation }) {
  const {
    data: sessionData,
    isLoading,
    refetch: refetchSessionData,
    isRefetching,
  } = useSessions();

  const favouriteSessions = React.useMemo(() => {
    if (!sessionData) return [];
    return sessionData
      .map(day => ({
        ...day,
        session_list: day.session_list.filter(session => session.isFavorite),
      }))
      .filter(day => day.session_list.length > 0);
  }, [sessionData]);

  if (isLoading) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <>
      <BackHeader title="Favorite Sessions" showBtn={true} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchSessionData}
            tintColor={COLORS.primary}
          />
        }
      >
        {favouriteSessions.length > 0 ? (
          favouriteSessions.map((day, index) => (
            <View key={day.date || index}>
              <Text style={styles.dateHeader}>
                {getFullNameFormatDate(day?.date)}
              </Text>
              {day.session_list.map(session => (
                <Card key={session.id} style={styles.cardOngoing}>
                  <SessionListItem
                    title={session?.title}
                    time={formatTimeRange(
                      session?.start_time,
                      session?.end_time,
                    )}
                    onPress={() =>
                      navigation.navigate('SessionsDetailsScreen', {
                        sessionId: session.id,
                      })
                    }
                    speakers={session?.speakers}
                    workshopNo={session?.workshop_no}
                    status={session?.status}
                    isFavorite={session?.isFavorite}
                  />
                </Card>
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>
            You have no favorite sessions yet.
          </Text>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  dateHeader: { fontSize: TEXT_SIZES.md, fontWeight: 'bold', margin: 10 },
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
    backgroundColor: COLORS.white,
    paddingRight: 30,
    borderRadius: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
