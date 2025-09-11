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
import SessionsDetailsScreen from '../screens/SessionsDetailsScreen';
import FavouriteSessionScreen from '../screens/FavouriteSessionScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import AttendeesScreen from '../screens/AttendeesScreen';
import SpeakersScreen from '../screens/SpeakersScreen';
import ViewAttendeeDetailsScreen from '../screens/ViewAttendeeDetailsScreen';
import ViewSpeakersDetailsScreen from '../screens/ViewSpeakersDetailsScreen';
import MyAgendaScreen from '../screens/MyAgendaScreen';
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
      <AppStack.Screen
        name="SessionsDetailsScreen"
        component={SessionsDetailsScreen}
      />
      <AppStack.Screen
        name="FavouriteSessionScreen"
        component={FavouriteSessionScreen}
      />
      <AppStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <AppStack.Screen name="QRScannerScreen" component={QRScannerScreen} />
      <AppStack.Screen name="AttendeesScreen" component={AttendeesScreen} />
      <AppStack.Screen name="SpeakersScreen" component={SpeakersScreen} />
      <AppStack.Screen
        name="ViewAttendeeDetailsScreen"
        component={ViewAttendeeDetailsScreen}
      />
      <AppStack.Screen
        name="ViewSpeakersDetailsScreen"
        component={ViewSpeakersDetailsScreen}
      />
      <AppStack.Screen name="MyAgendaScreen" component={MyAgendaScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
