import React from 'react';
import { View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import EnterLoginOTPScreen from '../screens/EnterLoginOTPScreen';
import HomeDrawerNavigator from '../navigation/HomeDrawerNavigator';

const Stack = createStackNavigator();

const TestScreen = ({ navigation }: any) => (
  <View style={{ flex: 1 }}>
    <Button
      title="Go to Main App"
      onPress={() => navigation.navigate('LoginScreen')}
    />
    {/* Your test components */}
    <HomeDrawerNavigator />
  </View>
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
