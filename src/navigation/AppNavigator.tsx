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
import SessionsScreen from '../screens/SessionsScreen';
import MyAgendaScreen from '../screens/MyAgendaScreen';
import MyAgendaDetailsScreen from '../screens/MyAgendaDetailsScreen';
import ExhibitorsScreen from '../screens/ExhibitorsScreen';
import SponsorsScreen from '../screens/SponsorsScreen';
import HelpSupportScreen from '../screens/HelpAndSupportScreen';
import ExhibitorsScreenDetails from '../screens/ExhibitorsScreenDetails';
import SponsorsDetailsScreen from '../screens/SponsorsDetailsScreen';
import ConnectionForm from '../screens/ConnectionForm';
import ConnectionDetails from '../screens/ConnectionDetails';
import ConnectionFound from '../screens/ConnectionFound';
import ConnectionEdit from '../screens/ConnectionEdit';
import ConnectionScreen from '../screens/ConnectionsScreen';

const AppStack = createStackNavigator();

function BottomTabNavigatorWrapper({ route }) {
  // Get initialRouteName from params, fallback to 'Home'
  const initialRouteName = route?.params?.initialRouteName || 'Home';
  return <BottomTabNavigator initialRouteName={initialRouteName} />;
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigatorWrapper}
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
      <AppStack.Screen name="SessionsScreen" component={SessionsScreen} />
      <AppStack.Screen
        name="MyAgendaDetailsScreen"
        component={MyAgendaDetailsScreen}
      />
      <AppStack.Screen name="ExhibitorsScreen" component={ExhibitorsScreen} />
      <AppStack.Screen name="SponsorsScreen" component={SponsorsScreen} />
      <AppStack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
      <AppStack.Screen
        name="ExhibitorsScreenDetails"
        component={ExhibitorsScreenDetails}
      />
      <AppStack.Screen
        name="SponsorsDetailsScreen"
        component={SponsorsDetailsScreen}
      />
      {/* Connection screens */}
      <AppStack.Screen name="ConnectionForm" component={ConnectionForm} />
      <AppStack.Screen name="ConnectionDetails" component={ConnectionDetails} />
      <AppStack.Screen name="ConnectionFound" component={ConnectionFound} />
      <AppStack.Screen name="ConnectionEdit" component={ConnectionEdit} />
      <AppStack.Screen name="ConnectionScreen" component={ConnectionScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
