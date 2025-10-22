import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, FlatList } from 'react-native';
import { COLORS } from '../utils/constants';

import SessionListItem from '../components/sessionListitem';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import Card from '../components/card';
import SearchUI from '../components/Search';
import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
import LoadingOverlay from '../components/loadingOverlay';
import UserList from '../components/userList';
import { useAttendees } from '../hooks/useApi';

type Attendee = { id?: number | string; name?: string; [key: string]: any };

export default function AttendeesScreen({ ...props }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: attendeesData,
    isLoading,
    refetch: refetchData,
    isRefetching: isRefetching,
  } = useAttendees();

  console.log('attendeesData', attendeesData);
  const filteredData =
    attendeesData?.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];
  const viewDetails = id => {
    props.navigation.navigate('ViewAttendeeDetailsScreen', { userId: id });
  };
  //   const viewSpeaker = () => {
  //     Alert.alert('Development Work in progress');
  //   };
  //console.log('apiData', apiData, getToken());
  return (
    <>
      <BackHeader
        title="Attendees"
        showBtn={true}
        //   rightFunction={rightFunction}
        //   rightLabel={'Read All'}
      />
      <SearchUI
        value={searchQuery}
        placeholder="Search Attendees..."
        onChangeText={setSearchQuery}
      />
      <FlatList<Attendee>
        data={filteredData}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : String(index)
        }
        renderItem={({ item }) => (
          <UserList attendeesData={item} viewDetails={viewDetails} />
        )}
        contentContainerStyle={styles.scrollContainer}
        refreshing={isRefetching}
        onRefresh={refetchData}
        ListEmptyComponent={
          isLoading ? <LoadingOverlay visible={loading} /> : <></>
        }
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={21}
        removeClippedSubviews
      />
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
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
