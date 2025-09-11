import React from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { COLORS, TEXT_SIZES } from '../utils/constants';
import SessionListItem from '../components/sessionListItem';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
import { formatTimeRange, getFullNameFormatDate } from '../utils/helpers';
import LoadingOverlay from '../components/loadingOverlay';
import { useSessions } from '../hooks/useApi';

export default function FavouriteSessionScreen({ ...props }) {
  const [favouriteSessions, setFavouriteSessions] = React.useState([]);
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
              session => session.isFavorite === true,
            ),
          };
        })
        .filter(day => day.session_list.length > 0);
      setFavouriteSessions(favSessions);
    } else {
      setFavouriteSessions([]);
    }
  }, [sessionData]);

  return (
    <>
      <BackHeader title="Favorite Sessions" showBtn={true} />
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
        ) : (
          favouriteSessions?.map((day, index) => (
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
    backgroundColor: COLORS.white,
    paddingRight: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
