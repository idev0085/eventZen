import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '../components/card';
import CustomText from '../components/text';
import TextBox from '../components/textBox';
import Button from '../components/ui/button';
import { GreenBadge, COLORS } from '../utils/constants';
import UserDetails from '../components/userDetails';

export default function CompanyDetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <UserDetails
        name="Debanjan Sarkar"
        company="Cognizant"
        designation="Software Engineer"
        image="https://reactjs.org/logo-og.png"
      />
    </SafeAreaView>
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
