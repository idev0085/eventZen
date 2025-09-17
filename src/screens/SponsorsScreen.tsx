import React, { use, useEffect, useState } from 'react';
import { Alert, StyleSheet, View, RefreshControl, Text } from 'react-native';
import { COLORS } from '../utils/constants';

import SessionListItem from '../components/sessionListItem';
import { DrawerLayoutAndroid, ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import SearchUI from '../components/Search';
import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
import LoadingOverlay from '../components/loadingOverlay';
import UserList from '../components/userList';
import { useSponsors } from '../hooks/useApi';

export default function SponsorsScreen({ ...props }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: sponsorsData,
    isLoading,
    refetch: refetchData,
    isRefetching: isRefetching,
  } = useSponsors();

  console.log('sponsorsData', sponsorsData);
  const filteredData =
    sponsorsData?.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];
  const viewDetails = id => {
    props.navigation.navigate('SponsorsDetailsScreen', { sponsorId: id });
  };
  //   const viewSpeaker = () => {
  //     Alert.alert('Development Work in progress');
  //   };
  //console.log('apiData', apiData, getToken());
  return (
    <>
      <BackHeader
        title="Sponsors"
        showBtn={true}
        //   rightFunction={rightFunction}
        //   rightLabel={'Read All'}
      />
      <SearchUI
        value={searchQuery}
        placeholder="Search Sponsors..."
        onChangeText={setSearchQuery}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchData}
            tintColor={COLORS.primary}
          />
        }
      >
        {isLoading ? (
          <LoadingOverlay visible={loading} />
        ) : (
          filteredData?.map((value, index) => (
            <UserList
              key={index}
              sponsorsData={value}
              viewDetails={viewDetails}
            />
          ))
        )}
      </ScrollView>
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
