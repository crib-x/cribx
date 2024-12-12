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
  login: (credentials: AuthCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        try {
          const user = await authService.login(credentials)
          set({ user, isAuthenticated: true })
        } catch (error) {
          set({ user: null, isAuthenticated: false })
          throw error
        }
      },
      signup: async (data) => {
        try {
          const user = await authService.signup(data)
          set({ user, isAuthenticated: true })
        } catch (error) {
          set({ user: null, isAuthenticated: false })
          throw error
        }
      },
      logout: async () => {
        try {
          await authService.logout()
          set({ user: null, isAuthenticated: false })
        } catch (error) {
          console.error('Logout failed:', error)
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)