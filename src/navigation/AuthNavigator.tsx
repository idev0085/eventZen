import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import EnterLoginOTPScreen from '../screens/EnterLoginOTPScreen';
import AppNavigator from './AppNavigator';
import CMSScreen from '../screens/CMSScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="EnterLoginOTPScreen"
        component={EnterLoginOTPScreen}
      />
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="CMSScreen" component={CMSScreen} />
    </Stack.Navigator>
  );
}
