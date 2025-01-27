import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import Auth from '../components/account/Auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Handle font loading errors
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Manage Supabase session
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {session && session.user ? <RootLayoutNav /> : <Auth />}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const theme = {
    
    ...DarkTheme,
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#0C1319',
      card: '#040D17',
      text: '#FFFFFF',
      border: '#000000',
      notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ title: 'Shows', headerShown: false }}
        />
        <Stack.Screen name="find-artist" options={{ title: 'Artist' }} />
        <Stack.Screen name="find-venue" options={{ title: 'Venue' }} />
        <Stack.Screen name="select-date" options={{ title: 'Date' }} />
        <Stack.Screen name="select-show" options={{ title: 'Show' }} />
        <Stack.Screen
          name="log-show"
          options={{
            title: 'Log Show',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="show-details/[id]"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="show-details/edit-notes"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="show-details/manage-photos-page"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
