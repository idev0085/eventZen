import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import ListItem from '../components/listItem';
import Card from '../components/card';
import SearchUI from '../components/Search';
import BackHeader from '../components/BackHeader';
import CustomText from '../components/ui/text';
import LoadingOverlay from '../components/loadingOverlay';
import { useConnections } from '../hooks/useApi';
import { useNavigation } from '@react-navigation/native';

export default function ConnectionScreen({ ...props }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const {
    data: connectionData,
    isLoading,
    refetch: refetchConnectionData,
    isRefetching: isRefetchingConnection,
  } = useConnections();

  const filteredData =
    connectionData?.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <>
      <BackHeader title="Connection Made" showBtn={false} />
      <SearchUI
        value={searchQuery}
        placeholder="Search Connections..."
        onChangeText={setSearchQuery}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingConnection}
            onRefresh={refetchConnectionData}
            tintColor={COLORS.primary}
          />
        }
      >
        {isLoading ? (
          <LoadingOverlay visible={true} />
        ) : filteredData.length > 0 ? (
          filteredData.map((item): any => (
            <Card key={item.id} style={styles.card}>
              <ListItem
                title={item.name}
                designation={item.connection_role}
                companyName={item.company_name}
                avatar={{ uri: item.connection_image }}
                onPress={() =>
                  navigation.navigate('ConnectionDetails', {
                    connectionId: item.id,
                  })
                }
              />
            </Card>
          ))
        ) : (
          <CustomText style={styles.noResultsText}>
            No connections found.
          </CustomText>
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
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
