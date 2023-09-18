import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
      return SecureStore.getItemAsync(key)
    },
    setItem: (key: string, value: string) => {
      SecureStore.setItemAsync(key, value)
    },
    removeItem: (key: string) => {
      SecureStore.deleteItemAsync(key)
    },
  }

const supabaseUrl = 'https://mbfhsthnuwvtoubyrclp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZmhzdGhudXd2dG91YnlyY2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5ODk3NzgsImV4cCI6MjAwODU2NTc3OH0.6BBai7LfQD6Tqwh86nVkQvpDd1i-5gXqBPAWO6oYt2U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
