// import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.CB_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.CB_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.CB_PRIVATE_SUPABASE_SERVICE_ROLE_KEY!;

export default createClient(supabaseUrl, supabaseServiceRoleKey);
