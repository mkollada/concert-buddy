import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase';
import Auth from '../components/Auth';

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
  const colorScheme = useColorScheme();
  // const [submitShow, setSubmitShow] = useState<Show|null>(null)

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="find-artist" options={{  title: 'Artist' }} />
        <Stack.Screen name="find-venue" options={{ title: 'Venue' }} />
        <Stack.Screen name="select-date" options={{ title: 'Date' }} />
        <Stack.Screen 
          name="log-show" 
          options={{ 
            title: 'Log Show',
          //   headerRight: 
          //   () => (
          //     <Pressable>
          //       {({ pressed }) => (
          //         <Text
          //           style={{ marginRight: 15, 
          //             opacity: pressed ? 0.5 : 1,
          //           color: 'white' }}
          //         >Save</Text>
          //       )}
          //     </Pressable>
          //  ),
          }} />
        <Stack.Screen 
          name="show-details/[id]"
          options={{
            presentation: 'modal',
            headerShown: false
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
