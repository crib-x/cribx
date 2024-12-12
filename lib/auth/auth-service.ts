import { createClient } from '../supabase/client'

export interface AuthCredentials {
  email: string
  password: string
}

export interface SignupData extends AuthCredentials {
  name: string
  role: 'manager' | 'tenant'
}

export const authService = {
  async login({ email, password }: AuthCredentials) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      return {
        id: data.user.id,
        email: data.user.email!,
        name: profile.name,
        role: profile.role,
      }
    }

    throw new Error('Login failed')
  },

  async signup({ email, password, name, role }: SignupData) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      await supabase.from('profiles').insert([
        {
          id: data.user.id,
          name,
          role,
        },
      ])

      return {
        id: data.user.id,
        email: data.user.email!,
        name,
        role,
      }
    }

    throw new Error('Signup failed')
  },

  async logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
  },
}