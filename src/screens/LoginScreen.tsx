import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import TextBox from '../components/ui/textBox';
import { COLORS, PNG_IMAGES, TEXT_SIZES } from '../utils/constants';
import RightArrowLoginButton from '../../assets/svg/svgComponents/RightArrowLoginButton';
import { useState } from 'react';
import Toast from 'react-native-simple-toast';
import { useAuth } from '../hooks/useAuth';
import Checkbox from '@react-native-community/checkbox';

export default function LoginScreen({ ...props }) {
  const [email, setEmail] = useState('henry.roy@example.com');
  const { performRequestOtp, isRequestingOtp } = useAuth();
  const [isChecked, setChecked] = useState(false);

  const btnHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      Toast.show('Invalid Email', Toast.LONG);
      return;
    }
    Toast.show('Please wait...', Toast.LONG);
    performRequestOtp({ email });
  };

  //! form validation
  const isFilled = !!isChecked && !!email;
  const isCTAInActive = !isFilled || isRequestingOtp;

  return (
    <View>
      <Image
        source={PNG_IMAGES.LoginBg}
        style={styles.background}
        width={100}
        height={100}
      />
      {/* <LoginImageBackground /> */}
      <Card style={styles.card}>
        <View>
          <CustomText style={styles.title}>Welcome Back !</CustomText>
          <CustomText style={styles.subtitle}>Login to continue !</CustomText>
          <TextBox
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            editable={true}
            required={true}
          />
          <CustomText style={styles.infoText}>
            We will send you one time password (OTP)
          </CustomText>
          <View style={styles.termsConditionWrapper}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              tintColors={{ true: COLORS.primary }}
            />
            <CustomText style={styles.infoTextCheck}>
              I have read and aggree to the{' '}
              <Text
                style={styles.textUnderLine}
                onPress={() =>
                  props.navigation.navigate('TermsConditionsScreen')
                }
              >
                Terms and conditions
              </Text>{' '}
              ,{' '}
              <Text
                style={styles.textUnderLine}
                onPress={() => props.navigation.navigate('PrivacyPolicyScreen')}
              >
                privacy policy
              </Text>
            </CustomText>
          </View>
          {/* <CustomText style={{ marginBottom: 50, ...styles.infoText }}>
            password (OTP)
          </CustomText> */}
          <View style={styles.btnContainer}>
            <Pressable
              disabled={isCTAInActive}
              onPress={btnHandler}
              android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: true }}
              style={({ pressed }) => [
                {
                  position: 'absolute',
                  // left: '40%',
                  //top: -15,
                  alignSelf: 'center',
                  transform: [{ scale: pressed ? 0.9 : 1 }],
                  opacity: !isFilled ? 0.5 : 1,
                },
              ]}
            >
              <RightArrowLoginButton
                // isDisabled={!isRequestingOtp || !isFilled}
                isDisabled={!isFilled}
              />
            </Pressable>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignSelf: 'center',
    width: 'auto',
    position: 'relative',
    minWidth: 375,
    minHeight: 427,
  },
  card: {
    position: 'absolute',
    top: '300%',
    alignSelf: 'center',
    width: '85%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    paddingBottom: 30,
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
    //marginBottom: 10,
    fontSize: TEXT_SIZES.sm,
    fontFamily: 'Roboto-Reguler',
    color: COLORS.black,
  },
  infoText: {
    textAlign: 'center',
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Reguler',
    marginBottom: 10,
  },
  infoTextCheck: {
    // textAlign: 'center',
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Reguler',
    paddingLeft: 5,
    paddingRight: 10,
    lineHeight: 20,
  },
  btnContainer: {
    position: 'relative',
    // marginTop: 20,
  },
  termsConditionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textUnderLine: {
    fontFamily: 'Roboto-Bold',
    textDecorationLine: 'underline',
  },
});
