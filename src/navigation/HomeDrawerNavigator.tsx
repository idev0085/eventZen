import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSideBar from '../screens/CustomSidebar';
import { COLORS, PNG_IMAGES } from '../utils/constants';
import DrawerMenuButton from '../components/drawerMenuButton';
import HomeHeader from '../components/homeHeader';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = (props: any) => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeContent"
      drawerContent={props => <CustomSideBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        drawerStyle: {
          backgroundColor: COLORS.background,
          width: '95%',
        },
        headerLeft: () => <DrawerMenuButton />,
      }}
    >
      <Drawer.Screen
        name="HomeContent"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
