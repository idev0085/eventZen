import React from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import BootSplash from 'react-native-bootsplash';
import RatingCard from '../components/RatingSelectorCard';

const Stack = createStackNavigator();

const TestScreen = ({ navigation }: any) => (
  <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
    <RatingCard />
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
