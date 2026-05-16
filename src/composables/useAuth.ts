import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

/**
 * useAuth — thin composition layer over the auth store + router.
 * Use this inside components so they never import the store directly.
 */
export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  async function login(email: string, password: string) {
    await authStore.login({ email, password })
    await router.push({ name: 'dashboard' })
  }

  async function logout() {
    authStore.logout()
    await router.push({ name: 'login' })
  }

  return {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    login,
    logout,
  }
}
