import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials } from '@/types'
import { authService } from '@/services/auth.service'

/**
 * Auth store — manages JWT token + current user.
 * Token is persisted in localStorage so page refresh doesn't log the user out.
 */
export const useAuthStore = defineStore('auth', () => {
  // ─── State ───────────────────────────────────────────────────────────────
  const token = ref<string | null>(localStorage.getItem('crm_token'))
  const user = ref<User | null>(JSON.parse(localStorage.getItem('crm_user') ?? 'null'))

  // ─── Getters ─────────────────────────────────────────────────────────────
  const isAuthenticated = computed(() => !!token.value)

  // ─── Actions ─────────────────────────────────────────────────────────────
  async function login(credentials: LoginCredentials) {
    const response = await authService.login(credentials)
    token.value = response.token
    user.value = response.user
    localStorage.setItem('crm_token', response.token)
    localStorage.setItem('crm_user', JSON.stringify(response.user))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('crm_token')
    localStorage.removeItem('crm_user')
  }

  return { token, user, isAuthenticated, login, logout }
})
