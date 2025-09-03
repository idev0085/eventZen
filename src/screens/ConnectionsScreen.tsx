import { StyleSheet, View } from 'react-native';
import { COLORS } from '../utils/constants';
import ListItem from '../components/listItem';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import SearchUI from '../components/Search';
import BackHeader from '../components/BackHeader';

export default function ConnectionScreen() {
  return (
    <>
      <BackHeader title="Connection" showBtn={false} />
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
    </>
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
