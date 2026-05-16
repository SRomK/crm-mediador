import api from './api'
import type { LoginCredentials, AuthResponse } from '@/types'

// Mock data for development — remove when real API is available
const MOCK_USER = {
  id: '1',
  name: 'Ana García',
  email: 'ana@mediador.com',
  role: 'mediator' as const,
  avatar: 'https://i.pravatar.cc/150?img=1',
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // DEV: bypass API and use mock credentials
    if (import.meta.env.DEV) {
      if (credentials.email === 'demo@crm.com' && credentials.password === 'demo1234') {
        return { token: 'mock-jwt-token', user: MOCK_USER }
      }
      throw new Error('Credenciales incorrectas')
    }

    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  async refreshToken(): Promise<{ token: string }> {
    const { data } = await api.post<{ token: string }>('/auth/refresh')
    return data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },
}
