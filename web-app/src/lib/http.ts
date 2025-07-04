import axios from "axios"
import { API_BASE_URL } from "@/config/api"

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("@mei-digital:token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@mei-digital:token")
      window.location.href = "/sign-in"
    }
    return Promise.reject(error)
  }
) 