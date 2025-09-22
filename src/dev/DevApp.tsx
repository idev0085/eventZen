import React from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import BootSplash from 'react-native-bootsplash';
import ConnectionForm from '../screens/ConnectionForm';
import QRScannerScreen from '../screens/QRScannerScreen';
//import QRScannerModal from '../components/QRScannerModal';
import ConnectionDetails from '../screens/ConnectionDetails';
import ConnectionEdit from '../screens/ConnectionEdit';

const Stack = createStackNavigator();

const TestScreen = ({ navigation }: any) => (
  <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
    {/* <QRScannerScreen /> */}
    <ConnectionEdit />
    {/* <ConnectionDetails /> */}
  </SafeAreaView>
);

export default function DevApp() {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}
    >
      <Stack.Navigator initialRouteName="Test">
        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
