import { StyleSheet } from 'react-native';
import Card from '../components/card';
import CustomText from '../components/text';
import TextBox from '../components/textBox';
import Button from '../components/ui/button';
import { AddToCalendar } from '../utils/constants';

export default function LoginScreen() {
  const btnHandler = () => {
    console.log('CAlled');
  };
  return (
    <Card style={styles.card}>
      <CustomText style={styles.title}>Welcome Back</CustomText>
      <CustomText style={styles.subtitle}>Please login to continue</CustomText>
      <TextBox
        style={styles.input}
        placeholder="Email"
        onChangeText={() => {}}
        value=""
        editable={true}
        required={true}
      />
      <CustomText style={styles.infoText}>
        We will send OTP to your email
      </CustomText>
      <AddToCalendar />
      <Button title="Login" onPress={btnHandler} />
    </Card>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#6B7280',
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
