import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, GreenBadge, COLORS } from '../utils/constants';
import UserDetails from '../components/userDetails';
import ContactDetails from '../components/contactDetails';
import AddNote from '../components/addNote';
import ListItem from '../components/listItem';
import SessionListItem from '../components/sessionListItem';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import TextBox from '../components/ui/textBox';
import SearchUI from '../components/Search';
import CustomText from '../components/ui/text';
export default function SessionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <CustomText style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>
        28 Apr, 2025
      </CustomText>

      <Card style={styles.cardDisable}>
        <SessionListItem
          title="Opening Keynote: The Future of Innovation"
          time="10:00 AM - 11:00 AM"
          onPress={() => Alert.alert('Item Pressed')}
          speakers={[
            {
              name: 'Dr. A',
              designation: 'Chief Innovation Officer',
              company: 'Innovatech Solutions',
            },
          ]}
          workshopNo="Workshop NO : 01"
          status="Completed"
        />
      </Card>

      <Card style={styles.cardOngoing}>
        <SessionListItem
          title="Opening Keynote: The Future of Innovation"
          time="10:00 AM - 11:00 AM"
          onPress={() => Alert.alert('Item Pressed')}
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
      <Card style={styles.card}>
        <SessionListItem
          title="Opening Keynote: The Future of Innovation"
          time="10:00 AM - 11:00 AM"
          onPress={() => Alert.alert('Item Pressed')}
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
    padding: 10,
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
    padding: 10,
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
    padding: 10,
    borderRadius: 10,
  },
});
