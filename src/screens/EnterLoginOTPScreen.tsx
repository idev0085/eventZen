import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../components/card';
import {
  COLORS,
  OtpCenter,
  OtpEdit,
  PNG_IMAGES,
  TEXT_SIZES,
} from '../utils/constants';
import CustomText from '../components/ui/text';
import Button from '../components/ui/button';
import { OtpInput } from 'react-native-otp-entry';

const EnterLoginOTPScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const senderEmail = 'johnsebastian@gmail.com';
  const resendTimer = '00:41';

  const handleVerifyOTP = () => {
    console.log('OTP CTA Called');
  };

  const handleResendOTP = () => {
    console.log('OTP Resent');
  };

  return (
    <View>
      <Image source={PNG_IMAGES.LoginBg} style={styles.backgroundImage} />
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
            <OtpEdit />
          </View>
          {/* Add your OTP Input field */}
          <View style={{ marginTop: 20 }}>
            <OtpInput
              numberOfDigits={5}
              focusColor="black"
              autoFocus={false}
              hideStick={false}
              blurOnFilled={true}
              disabled={isLoading}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onFocus={() => console.log('Focused')}
              onBlur={() => console.log('Blurred')}
              onTextChange={text => console.log(text)}
              onFilled={text => console.log(`OTP is ${text}`)}
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
                filledPinCodeContainerStyle: { backgroundColor: 'red' },
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
              Didn’t receive a OTP?
            </CustomText>

            {resendTimer ? (
              <Text style={styles.infoLink}>{`Resent in ${resendTimer}`}</Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text
                  style={{
                    ...styles.infoLink,
                    textDecorationLine: 'underline',
                  }}
                >
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Button
            onPress={handleVerifyOTP}
            title="Verify"
            loading={isLoading}
            textStyle={styles.btnTextStyle}
            style={styles.btnStyle}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'center',
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
    top: '30%',
  },
  contentContainer: {
    flex: 1,
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
  },
  btnStyle: {
    width: '100%',
  },
  btnTextStyle: {
    fontSize: TEXT_SIZES.sm,
    fontWeight: '400',
  },
  inputOtpContainer: {
    // height: 10,
  },
  inputOtpPincodeContainerStyle: {
    backgroundColor: COLORS.textBoxPrimary,
    height: 45,
  },
  inputOtpFocusStickStyle: {},
  inputOtpFocusedPinCodeContainerStyle: {},
  inputOtpPlaceholderTextStyle: {},
  inputOtpFilledPinCodeContainerStyle: {
    color: 'red',
  },
  inputOtpDisabledPinCodeContainerStyle: {},
});

export default EnterLoginOTPScreen;
