import { http } from "@/lib/http"
import { API_ENDPOINTS } from "@/config/api"

export interface User {
  id: string
  name: string
  email: string
}

export interface SignInData {
  email: string
  password: string
}

interface AuthResponse {
  user: User
  token: string
}

class AuthService {
  private static instance: AuthService
  private user: User | null = null

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async signIn({ email, password }: SignInData): Promise<User> {
    try {
      const { data } = await http.post<AuthResponse>(API_ENDPOINTS.auth.signIn, {
        email,
        password,
      })

      localStorage.setItem("@mei-digital:token", data.token)
      this.user = data.user
      return data.user
    } catch (error) {
      console.log(error)
      throw new Error("Credenciais inválidas")
    }
  }

  async signOut(): Promise<void> {
    localStorage.removeItem("@mei-digital:token")
    this.user = null
  }

  getUser(): User | null {
    return this.user
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("@mei-digital:token")
  }
}

export const authService = AuthService.getInstance() 