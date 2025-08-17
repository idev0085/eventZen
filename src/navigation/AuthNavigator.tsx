import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
// import SplashScreen from '../screens/SplashScreen';
// import OnboardingScreen from '../screens/OnboardingScreen';
// import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CompanyDetailsScreen from '../screens/CompanyDetails';
// import EditorScreen from '../screens/EditorScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import FileManagerScreen from '../screens/FileManagerScreen';
// import EffectsScreen from '../screens/EffectsScreen';
// import ExportScreen from '../screens/ExportScreen';
// import ProjectsScreen from '../screens/ProjectsScreen';
// import LibraryScreen from '../screens/LibraryScreen';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName = '';

//           switch (route.name) {
//             case 'Home':
//               iconName = 'home';
//               break;
//             case 'Import':
//               iconName = 'file-import';
//               break;
//             case 'Editor':
//               iconName = 'edit';
//               break;
//             case 'Settings':
//               iconName = 'cog';
//               break;
//             case 'Library':
//               iconName = 'music';
//               break;
//           }

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#8B5CF6',
//         tabBarInactiveTintColor: '#9CA3AF',
//         tabBarStyle: {
//           backgroundColor: '#1F2937',
//           borderTopWidth: 0,
//           paddingTop: 8,
//           paddingBottom: 8,
//           height: 80,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '500',
//           marginTop: 4,
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Import" component={ImportScreen} />
//       <Tab.Screen name="Editor" component={EditorScreen} />
//       <Tab.Screen name="Library" component={LibraryScreen} options={{ title: 'Library' }} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="CompanyDetailsScreen"
          component={CompanyDetailsScreen}
        />
        {/* <Stack.Screen name="EditorScreen" component={EditorScreen} /> */}
        {/* <Stack.Screen name="ImportScreen" component={ImportScreen} /> */}
        {/* <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="FileManager" component={FileManagerScreen} />
        <Stack.Screen name="Effects" component={EffectsScreen} />
        <Stack.Screen name="Export" component={ExportScreen} />
        <Stack.Screen name="Projects" component={ProjectsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
