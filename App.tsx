import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';

import { ThemeService } from './src/services/ThemeService';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: any) => {
        const message =
          error.response?.data?.message || 'Something went wrong!';
        Toast.show(message, Toast.LONG);
      },
    },
  },
});

const isAuthenticated = false;

function AppContent() {
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              barStyle={ThemeService.getStatusBarStyle()}
              backgroundColor="transparent"
              translucent={Platform.OS === 'android'}
            />
            <AppContent />
            {/* <SessionExpiredModal /> */}
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
