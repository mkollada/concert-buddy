// import AsyncStorage from "@react-native-async-storage/async-storage";
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

const supabaseUrl = process.env.CB_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.CB_PUBLIC_SUPABASE_ANON_KEY!;
// const supabaseServiceRoleKey = process.env.CB_PRIVATE_SUPABASE_SERVICE_ROLE_KEY!;

// export default createClient(supabaseUrl, supabaseServiceRoleKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
