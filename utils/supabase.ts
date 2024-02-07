import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://zufvmbdgucxuzpkvsygk.supabase.co'
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZnZtYmRndWN4dXpwa3ZzeWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwOTIwNDAsImV4cCI6MjAyMjY2ODA0MH0._lsL8keZqX2VRmt1MTEixgzOlTkjUJgHUJwfSBUXjtI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})