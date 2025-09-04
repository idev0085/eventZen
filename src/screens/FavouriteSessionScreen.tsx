import { Alert, StyleSheet, View } from 'react-native';
import { COLORS } from '../utils/constants';

import SessionListItem from '../components/sessionListItem';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';

import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
export default function FavouriteSessionScreen({ ...props }) {
  return (
    <>
      <BackHeader title="Favorite Sessions" showBtn={true} />
      <ScrollView style={styles.container}>
        <CustomText style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>
          28 Apr, 2025
        </CustomText>

        <Card style={styles.cardOngoing}>
          <SessionListItem
            title="Opening Keynote: The Future of Innovation"
            time="10:00 AM - 11:00 AM"
            onPress={() => props.navigation.navigate('SessionsDetailsScreen')}
            speakers={[
              {
                name: 'Dr. A',
                designation: 'Chief Innovation Officer',
                company: 'Innovatech Solutions',
              },
            ]}
            workshopNo="Workshop NO : 01"
            status="Ongoing"
          />
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
