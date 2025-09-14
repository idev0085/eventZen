import React from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import TagSelector from '../components/tagSelector';

const Stack = createStackNavigator();

const TestScreen = ({ navigation }: any) => (
  <SafeAreaView style={{ flex: 1 }}>
    <TagSelector />
  </SafeAreaView>
);

export default function DevApp() {
  return (
    <NavigationContainer>
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
