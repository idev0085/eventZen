import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
// import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeService } from './src/services/ThemeService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { AuthService } from './src/services/AuthService';
// import { ThemeService } from './src/services/ThemeService';
// import { AdService } from './src/services/AdService';
// import { PermissionService } from './src/services/PermissionService';
// import initI18n from './src/utils/i18n';

// Initialize i18n
//initI18n();

export default function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {};

  return (
    <>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <StatusBar
              barStyle={ThemeService.getStatusBarStyle()}
              backgroundColor="transparent"
              translucent={Platform.OS === 'android'}
            />
            <AuthNavigator />
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}
