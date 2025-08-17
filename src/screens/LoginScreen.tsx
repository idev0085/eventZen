import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import TextBox from '../components/ui/textBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, PNG_IMAGES, TEXT_SIZES } from '../utils/constants';
import RightArrowLoginButton from '../../assets/svg/svgComponents/RightArrowLoginButton';

export default function LoginScreen() {
  const btnHandler = () => {
    console.log('CAlled');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={PNG_IMAGES.LoginBg} style={styles.background} />
        <Card style={styles.card}>
          <View>
            <CustomText style={styles.title}>Welcome Back !</CustomText>
            <CustomText style={styles.subtitle}>Login to continue !</CustomText>
            <TextBox
              style={styles.input}
              placeholder="Email"
              onChangeText={() => {}}
              value=""
              editable={true}
              required={true}
            />
            <CustomText style={styles.infoText}>
              We will send you one time
            </CustomText>
            <CustomText style={{ marginBottom: 50, ...styles.infoText }}>
              password (OTP)
            </CustomText>
            <View style={styles.btnContainer}>
              <Pressable
                onPress={btnHandler}
                android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: true }}
                style={({ pressed }) => [
                  {
                    position: 'absolute',
                    left: '35%',
                    top: -15,
                    transform: [{ scale: pressed ? 0.9 : 1 }],
                  },
                ]}
              >
                <RightArrowLoginButton />
              </Pressable>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    justifyContent: 'center',
    width: 'auto',
    position: 'relative',
    minWidth: 375,
    minHeight: 427,
  },
  card: {
    position: 'absolute',
    top: '72%',
    alignSelf: 'center',
    width: '85%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: TEXT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: 2,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: TEXT_SIZES.xs,
    alignSelf: 'center',
    marginBottom: 20,
    color: COLORS.black,
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: TEXT_SIZES.xs,
  },
  infoText: {
    textAlign: 'center',
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textPrimary,
  },
  btnContainer: {
    position: 'relative',
  },
});
