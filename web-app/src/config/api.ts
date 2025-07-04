export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export const API_ENDPOINTS = {
  auth: {
    signIn: `${API_BASE_URL}/auth/sign-in`,
    signUp: `${API_BASE_URL}/auth/sign-up`,
  },
  services: {
    list: `${API_BASE_URL}/services`,
    detail: (id: string) => `${API_BASE_URL}/services/${id}`,
    create: `${API_BASE_URL}/services`,
    update: (id: string) => `${API_BASE_URL}/services/${id}`,
    delete: (id: string) => `${API_BASE_URL}/services/${id}`,
  },
  users: {
    me: `${API_BASE_URL}/users/me`,
    profile: (id: string) => `${API_BASE_URL}/users/${id}`,
  },
} 