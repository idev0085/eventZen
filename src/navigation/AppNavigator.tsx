import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import CompanyDetailsScreen from '../screens/CompanyDetails';
import CMSScreen from '../screens/CMSScreen';
import ViewProfile from '../screens/ViewProfile';
import EditProfile from '../screens/EditProfile';

import AboutScreen from '../screens/AboutScreen';
import LocationScreen from '../screens/LocationScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsConditionsScreen from '../screens/TermsConditionsScreen';
const AppStack = createStackNavigator();
function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <AppStack.Screen name="CMSScreen" component={CMSScreen} />
      <AppStack.Screen name="CompanyDetails" component={CompanyDetailsScreen} />
      <AppStack.Screen name="Profile" component={ViewProfile} />
      <AppStack.Screen name="EditProfile" component={EditProfile} />
      <AppStack.Screen name="AboutScreen" component={AboutScreen} />

      <AppStack.Screen name="LocationScreen" component={LocationScreen} />
      <AppStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <AppStack.Screen
        name="TermsConditionsScreen"
        component={TermsConditionsScreen}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
