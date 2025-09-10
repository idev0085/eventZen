import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';
import BootSplash from 'react-native-bootsplash';

import { ThemeService } from './src/services/ThemeService';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import {
  useAuthIsReady,
  useAuthStore,
  useIsAuthenticated,
} from './src/stores/authStore';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 0,
    },
    mutations: {
      onError: (error: any) => {
        const message =
          error.response?.data?.message || 'Something went wrong!';
        Toast.show(message, Toast.LONG);
      },
    },
  },
});

function AppContent() {
  const isAuthenticated = useIsAuthenticated();
  const isAuthReady = useAuthIsReady();

  console.log('AppContent:', {
    isAuthenticated,
  });

  // Show loading screen until we know auth status -- Loader will added.
  if (!isAuthReady) {
    // return <LoadingOverlay visible={true} />;
    return null;
  }

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}
    >
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

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
