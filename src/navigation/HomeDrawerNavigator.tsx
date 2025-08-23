import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSideBar from '../screens/CustomSidebar';
import { COLORS } from '../utils/constants';
import DrawerMenuButton from '../components/drawerMenuButton';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const HomeDrawerNavigator = (props: any) => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeContent"
      drawerContent={props => <CustomSideBar {...props} />}
      screenOptions={{
        headerShown: true,
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
