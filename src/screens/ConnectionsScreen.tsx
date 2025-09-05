import React, { use, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { COLORS } from '../utils/constants';
import ListItem from '../components/listItem';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import SearchUI from '../components/Search';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
import CustomText from '../components/ui/text';
import LoadingOverlay from '../components/loadingOverlay';

export default function ConnectionScreen({ ...props }) {
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await getToken();
      try {
        const response = await apiCall(
          BASE_URL + '/api/connections',
          'GET',
          undefined,
          token,
        );
        // Assuming the API returns an object with a 'data' array
        setApiData(response || []);
      } catch (error) {
        console.log('error fetching connections', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData =
    apiData?.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <>
      <BackHeader title="Connection" showBtn={false} />
      <SearchUI
        value={searchQuery}
        placeholder="Search Connections..."
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <LoadingOverlay visible={loading} />
        ) : filteredData.length > 0 ? (
          filteredData.map(item => (
            <Card key={item.id} style={styles.card}>
              <ListItem
                title={item.name}
                designation={item.connection_role}
                companyName={item.company_name}
                avatar={{ uri: item.connection_image }}
                onPress={() => Alert.alert('Development Work in progress')}
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
