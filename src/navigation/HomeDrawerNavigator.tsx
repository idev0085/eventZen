import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSideBar from '../screens/CustomSidebar';
import { COLORS } from '../utils/constants';

import HomeScreen from '../screens/HomeScreen';
import ViewProfile from '../screens/ViewProfile';
import FavouriteSessionScreen from '../screens/FavouriteSessionScreen';
import SpeakersScreen from '../screens/SpeakersScreen';
import ExhibitorsScreen from '../screens/ExhibitorsScreen';
import SponsorsScreen from '../screens/SponsorsScreen';
import HelpAndSupportScreen from '../screens/HelpAndSupportScreen';
import MyAgendaScreen from '../screens/MyAgendaScreen';
import EditProfile from '../screens/EditProfile';

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreenContent"
      drawerContent={props => <CustomSideBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.background,
          width: '95%',
        },
      }}
    >
      <Drawer.Screen name="HomeScreenContent" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ViewProfile} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="My Agenda" component={MyAgendaScreen} />
      <Drawer.Screen
        name="Favorite Session"
        component={FavouriteSessionScreen}
      />
      <Drawer.Screen name="Speakers" component={SpeakersScreen} />
      <Drawer.Screen name="Exhibitors" component={ExhibitorsScreen} />
      <Drawer.Screen name="Sponsors" component={SponsorsScreen} />
      <Drawer.Screen name="Help and Support" component={HelpAndSupportScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
