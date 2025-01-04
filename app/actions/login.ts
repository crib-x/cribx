import { AuthCredentials, authService } from "@/lib/auth/auth-service"
export const login = async (credentials: AuthCredentials) => {
    try {
       await authService.login(credentials)
    } catch (error) {
        throw error
    } finally {
    }
}