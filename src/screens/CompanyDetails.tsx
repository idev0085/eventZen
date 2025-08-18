import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GreenBadge, COLORS } from '../utils/constants';
import UserDetails from '../components/userDetails';
import ContactDetails from '../components/contactDetails';
import AddNote from '../components/addNote';

export default function CompanyDetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <UserDetails
        name="Debanjan Sarkar"
        company="Cognizant"
        designation="Software Engineer"
        image="https://reactjs.org/logo-og.png"
      />
      <ContactDetails
        heading="Contact Details"
        email="a@a.com"
        phone="+91 7596842521"
        address="EN-34 (9th Floor), Block-EN, Sector – V, Salt Lake City, Kolkata – 700091, West Bengal, India."
        website="www.kolkata.com"
        onPressEmail={() => Alert.alert('Email Pressed', 'a@a.com')}
        onPressPhone={() => Alert.alert('Phone Pressed', '+91 7596842521')}
        onPressWebsite={() => Alert.alert('Website Pressed', 'www.kolkata.com')}
        // socialLinks={[
        //   {
        //     name: 'FaceBook',
        //     url: 'https://www.facebook.com/debanjan.sarkar.7',
        //   },
        //   {
        //     name: 'Instagram',
        //     url: 'https://www.instagram.com/debanjan_sarkar/',
        //   },
        //   {
        //     name: 'Linkedin',
        //     url: 'https://www.instagram.com/debanjan_sarkar/',
        //   },
        //   { name: 'Twitter', url: 'https://twitter.com/debanjan_sarkar' },
        // ]}
      />
      <AddNote
        placeholder="Message"
        onChangeText={text => console.log(text)}
        heading="Add Note"
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
