import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, GreenBadge, COLORS } from '../utils/constants';
import UserDetails from '../components/userDetails';
import ContactDetails from '../components/contactDetails';
import AddNote from '../components/addNote';
import ListItem from '../components/listItem';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import TextBox from '../components/ui/textBox';
import SearchUI from '../components/Search';

export default function ConnectionScreen() {
  return (
    <ScrollView style={styles.container}>
      <SearchUI
        value=""
        placeholder="Search Connections..."
        onChangeText={() => {}}
      />

      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
      <Card style={styles.card}>
        <ListItem
          title="Alex Morgan"
          designation="Creative Strategy Experts"
          companyName="Innovatech Solutions"
          avatar={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
