import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../components/card';
import {
  APP_CONFIG,
  COLORS,
  OtpCenter,
  OtpEdit,
  PNG_IMAGES,
  TEXT_SIZES,
} from '../utils/constants';
import CustomText from '../components/ui/text';
import Button from '../components/ui/button';
import { OtpInput } from 'react-native-otp-entry';
import CustomHeader from '../components/customNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import Toast from 'react-native-simple-toast';

type AuthStackParamList = {
  EnterLoginOTPScreen: { email: string };
};
type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'EnterLoginOTPScreen'>;

const EnterLoginOTPScreen = (props: any) => {
  const route = useRoute<OTPScreenRouteProp>();
  const {
    performRequestOtp,
    isRequestingOtp,
    isVerifyingOtp,
    performVerifyOtp,
  } = useAuth();

  const { email: senderEmail } = route.params;
  const [timer, setTimer] = useState(APP_CONFIG.RESEND_TIMER);

  useEffect(() => {
    if (timer === 0) return;

    const intervalId = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleVerifyOTP = (otp: string) => {
    if (otp.length !== 4) {
      Toast.show('Invalid OTP', Toast.LONG);
      return;
    }
    performVerifyOtp({ email: senderEmail, otp });
  };

  const handleResendOTP = () => {
    if (timer === 0 && !isRequestingOtp) {
      performRequestOtp({ email: senderEmail });
      setTimer(APP_CONFIG.RESEND_TIMER);
    }
  };

  const handleBackPress = () => {
    props.navigation.goBack();
  };

  // Format the timer for display (e.g., 00:41)
  const formattedTimer = `00:${timer.toString().padStart(2, '0')}`;

  return (
    <View>
      <Image source={PNG_IMAGES.OtpBg} style={styles.backgroundImage} />
      <CustomHeader
        title="Enter Verification Code"
        onBackPress={() => handleBackPress()}
      />
      <Card style={styles.card}>
        <View style={styles.contentContainer}>
          <View style={styles.contentImage}>
            <OtpCenter />
          </View>
          <CustomText style={styles.subTitle}>
            We have sent OTP to email address
          </CustomText>
          <View style={styles.subTitleContainer}>
            <CustomText style={{ ...styles.subTitle, color: COLORS.primary }}>
              {senderEmail}
            </CustomText>
            <TouchableOpacity onPress={handleBackPress}>
              <OtpEdit />
            </TouchableOpacity>
          </View>
          {/* Add your OTP Input field */}
          <View style={{ marginTop: 20 }}>
            <OtpInput
              numberOfDigits={4}
              focusColor="black"
              autoFocus={false}
              hideStick={false}
              blurOnFilled={true}
              disabled={isVerifyingOtp}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              // onFocus={() => console.log('Focused')}
              // onBlur={() => console.log('Blurred')}
              // onTextChange={setInputOTP}
              onFilled={text => handleVerifyOTP(text)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              textProps={{
                accessibilityRole: 'text',
                accessibilityLabel: 'OTP digit',
                allowFontScaling: false,
              }}
              theme={{
                containerStyle: styles.inputOtpContainer,
                pinCodeContainerStyle: styles.inputOtpPincodeContainerStyle,
                filledPinCodeContainerStyle: { backgroundColor: '#fff' },
                pinCodeTextStyle: {},
                focusStickStyle: {},
                focusedPinCodeContainerStyle: {},
                placeholderTextStyle: {},
                disabledPinCodeContainerStyle: {},
              }}
            />
          </View>

          <View style={styles.infoContainer}>
            <CustomText style={styles.infoText}>
              {`Didn’t receive a OTP?`}
            </CustomText>

            {isRequestingOtp ? (
              <Text style={styles.infoLink}>Sending...</Text>
            ) : timer > 0 ? (
              <Text
                style={styles.infoLink}
              >{`Resend in ${formattedTimer}`}</Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text
                  style={[styles.infoLink, { textDecorationLine: 'underline' }]}
                >
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Button
            onPress={handleVerifyOTP}
            title="Verify"
            loading={isVerifyingOtp}
            textStyle={styles.btnTextStyle}
            style={styles.btnStyle}
            disabled={isVerifyingOtp}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    width: 'auto',
    top: 10,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    borderRadius: 20,
    top: '50%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  contentImage: {
    marginVertical: 40,
  },
  subTitle: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.black,
  },
  infoText: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textPrimary,
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
    gap: 5,
  },
  subTitleContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  infoLink: {
    fontSize: TEXT_SIZES.xs,
    fontWeight: '700',
    color: COLORS.primary,
  },
  btnStyle: {
    width: '100%',
  },
  btnTextStyle: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '400',
  },
  inputOtpContainer: {},
  inputOtpPincodeContainerStyle: {
    backgroundColor: COLORS.textBoxPrimary,
    height: 45,
    width: 45,
  },
});

export default EnterLoginOTPScreen;
