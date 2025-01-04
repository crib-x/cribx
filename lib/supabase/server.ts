// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config'
import { cookies } from 'next/headers'

export const  createClient = async () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase configuration')
  }
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie error
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie error
          }
        },
      },
    }
  )
}