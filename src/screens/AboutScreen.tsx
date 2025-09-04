import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CMSScreen from '../screens/CMSScreen';
import BackHeader from '../components/BackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../utils/constants';

const AboutScreen = () => {
  return (
    <>
      <BackHeader title="About Us" />
      <CMSScreen page="about" />
    </>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
