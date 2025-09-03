import { Alert, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import Button from '../components/ui/button';
import { EditProfileIcon, COLORS } from '../utils/constants';
import { WebView } from 'react-native-webview';

const CMSScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://reactnative.dev/' }}
        style={{ flex: 1 }}
      />

      <View style={styles.btnContainer}>
        <Button
          title={'Accept'}
          onPress={() => {}}
          style={{ width: '80%' }}
          textStyle={styles.btnTextStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default CMSScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  btnContainer: {
    height: 80,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
});
