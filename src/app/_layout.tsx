import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase';
import Auth from '../components/account/Auth';
import { SafeAreaContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
  const [session, setSession] = useState<Session | null>(null)

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!loaded) {
    return null;
  }
  return (
    <>
      { session && session.user ? <RootLayoutNav /> : <Auth />}
    </>
  )
}

function RootLayoutNav() {

  const theme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)', // The primary color of the app used in various components.
      background: '#0C1319', // Background color of the screens.
      card: '#040D17', // Background color of card-like elements, such as headers.
      text: '#FFFFFF', // The color of text.
      border: '#000000', // Color for borders and dividers.
      notification: 'rgb(255, 69, 58)', // Color for Notification dots.
    }
  }

  return (
    // <SafeAreaProvider>
    //   <SafeAreaView className='flex-1'>
        <ThemeProvider value={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="find-artist" options={{  title: 'Artist' }} />
            <Stack.Screen name="find-venue" options={{ title: 'Venue' }} />
            <Stack.Screen name="select-date" options={{ title: 'Date' }} />
            <Stack.Screen name="select-show" options={{ title: 'Show' }} />
            
            <Stack.Screen 
              name="log-show" 
              options={{ 
                title: 'Log Show',
                headerShown: false
              }} />
            <Stack.Screen 
              name="show-details/[id]"
              options={{
                presentation: 'modal',
                headerShown: false
              }}
            />
            <Stack.Screen 
              name="show-details/edit-notes" 
              options={{ 
                presentation: 'modal',
                headerShown: false    
            }} />
            <Stack.Screen 
              name="show-details/manage-photos-page" 
              options={{ 
                presentation: 'modal',
                headerShown: false    
            }} />
          </Stack>
        </ThemeProvider>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
