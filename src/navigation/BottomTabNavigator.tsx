import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  COLORS,
  TabConnection,
  TabConnectionActive,
  TabHome,
  TabHomeActive,
  TabSession,
  TabSessionActive,
  TEXT_SIZES,
} from '../utils/constants';

import SessionsScreen from '../screens/SessionsScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import HomeDrawerNavigator from './HomeDrawerNavigator';

const Tab = createBottomTabNavigator();

interface BottomTabNavigatorProps {
  initialRouteName?: string;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  initialRouteName = 'Home',
}) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
          height: 80,
          paddingBottom: 16,
          paddingTop: 5,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: TEXT_SIZES.xs,
          fontWeight: '400',
        },

        tabBarIcon: ({ focused }) => {
          let IconComponent;
          switch (route.name) {
            case 'Home':
              IconComponent = focused ? TabHomeActive : TabHome;
              break;
            case 'Session':
              IconComponent = focused ? TabSessionActive : TabSession;
              break;
            case 'Connection':
              IconComponent = focused ? TabConnectionActive : TabConnection;
              break;
            default:
              IconComponent = TabHome;
          }
          return (
            <IconComponent
              width={24}
              height={24}
              color={focused ? COLORS.primary : COLORS.black}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeDrawerNavigator} />
      <Tab.Screen name="Session" component={SessionsScreen} />
      <Tab.Screen name="Connection" component={ConnectionsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
