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
    
    // Sign in and create session
    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) throw signInError

    if (user) {
      // Fetch the user's profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError

      return {
        id: user.id,
        email: user.email!,
        name: profile.name,
        role: profile.role,
      }
    }

    throw new Error('Login failed')
  },

  async signup({ email, password, name, role }: SignupData) {
    const supabase = createClient()
    
    // Sign up user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    })

    if (signUpError) throw signUpError

    if (user) {
      // Create the user's profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            name,
            role,
          },
        ])

      if (profileError) throw profileError

      return {
        id: user.id,
        email: user.email!,
        name,
        role,
      }
    }

    throw new Error('Signup failed')
  },

  async logout() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  async refreshSession() {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.refreshSession()
    if (error) throw error
    return session
  }
}