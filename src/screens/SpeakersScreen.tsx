import React, { useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { COLORS } from '../utils/constants';

import { ScrollView } from 'react-native-gesture-handler';
import SearchUI from '../components/Search';
import BackHeader from '../components/BackHeader';

import LoadingOverlay from '../components/loadingOverlay';
import UserList from '../components/userList';
import { useSpeakers } from '../hooks/useApi';

export default function SpeakersScreen({ ...props }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: speakersData,
    isLoading,
    refetch: refetchData,
    isRefetching: isRefetching,
  } = useSpeakers();

  console.log('speakersData', speakersData);
  const filteredData =
    speakersData?.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];
  const viewDetails = id => {
    props.navigation.navigate('ViewSpeakersDetailsScreen', { userId: id });
  };

  return (
    <>
      <BackHeader title="Speakers" showBtn={true} />
      <SearchUI
        value={searchQuery}
        placeholder="Search Speakers..."
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
              speakersData={value}
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
