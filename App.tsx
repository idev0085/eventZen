// App.tsx

import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';

import { ThemeService } from './src/services/ThemeService';
import { useAuthStore } from './src/stores/authStore';
import { useProfile } from './src/hooks/useProfile';

import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import SplashScreen from './src/screens/SplashScreen'; // A simple component to show on startup

// Create the React Query client outside the component to prevent re-creation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: any) => {
        // This is a fallback global error handler for mutations
        // Our Axios interceptor will likely catch this first, but it's good practice.
        const message =
          error.response?.data?.message || 'Something went wrong!';
        Toast.show(message, Toast.LONG);
      },
    },
  },
});

/**
 * A dedicated component for the main app content.
 * This ensures that hooks like `useProfile` are called within the QueryClientProvider's context.
 */
function AppContent() {
  const { isAuthenticated, isHydrated } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    isHydrated: state.isHydrated,
  }));

  // This hook will now automatically fetch the user's profile and update
  // the Zustand store as soon as `isAuthenticated` becomes true.
  useProfile();

  // While we wait for Zustand to load the token from Keychain, show a splash screen.
  // This prevents the login screen from flashing for an already logged-in user.
  if (!isHydrated) {
    return <SplashScreen />;
  }

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

            {/* The global modal sits here, outside the navigation stack, to overlay everything */}
            {/* <SessionExpiredModal /> */}
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
