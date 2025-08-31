import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import CompanyDetailsScreen from '../screens/CompanyDetails';
import LoginScreen from '../screens/LoginScreen';

const AppStack = createStackNavigator();
function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="MainTabs" component={BottomTabNavigator} />
      <AppStack.Screen name="CompanyDetails" component={CompanyDetailsScreen} />
      <AppStack.Screen name="LoginScreen" component={LoginScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
