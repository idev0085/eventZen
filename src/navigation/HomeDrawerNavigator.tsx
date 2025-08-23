// src/navigation/HomeDrawerNavigator.tsx
import React from 'react';
import { Text, View, ViewBase } from 'react-native'; // View is not actually used here, can be removed
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSideBar from '../screens/CustomSidebar';
import { COLORS } from '../utils/constants';
import DrawerMenuIcon from '../../assets/svg/svgComponents/DrawerMenuIcon';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const HomeDrawerNavigator = () => {
  const navigation = useNavigation();
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
        headerLeft: () => (
          <DrawerMenuIcon
            width={30}
            height={30}
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
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
