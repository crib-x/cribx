import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService, type AuthCredentials, type SignupData } from '../auth/auth-service'

interface User {
  id: string
  email: string
  name: string
  role: 'manager' | 'tenant'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: AuthCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const user = await authService.login(credentials)
          set({ user, isAuthenticated: true })
        } catch (error) {
          set({ error: 'Login failed' })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const user = await authService.signup(data)
          set({ user, isAuthenticated: true })
        } catch (error) {
          set({ error: 'Signup failed' })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null })
        try {
          await authService.logout()
          set({ user: null, isAuthenticated: false })
        } catch (error) {
          set({ error: 'Logout failed' })
          console.error('Logout failed:', error)
        } finally {
          set({ isLoading: false })
        }
      },

      checkSession: async () => {
        set({ isLoading: true, error: null })
        try {
          const session = await authService.getSession()
          if (session?.user) {
            const { user } = session
            set({
              user: {
                id: user.id,
                email: user.email!,
                name: user.user_metadata.name,
                role: user.user_metadata.role,
              },
              isAuthenticated: true,
            })
          } else {
            set({ user: null, isAuthenticated: false })
          }
        } catch (error) {
          set({ error: 'Session check failed' })
          console.error('Session check failed:', error)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)