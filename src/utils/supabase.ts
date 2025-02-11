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

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL 
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
