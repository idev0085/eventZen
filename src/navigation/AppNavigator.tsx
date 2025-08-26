import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import CompanyDetailsScreen from '../screens/CompanyDetails';

const AppStack = createStackNavigator();
function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="MainTabs" component={BottomTabNavigator} />
      <AppStack.Screen name="CompanyDetails" component={CompanyDetailsScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
