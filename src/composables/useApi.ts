import { ref } from 'vue'

/**
 * useApi — wraps any async service call with loading / error state.
 *
 * const { data, loading, error, execute } = useApi(clientsService.getAll)
 * await execute()
 */
export function useApi<T, A extends unknown[]>(fn: (...args: A) => Promise<T>) {
  const data = ref<T | null>(null) as { value: T | null }
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function execute(...args: A): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      data.value = await fn(...args)
      return data.value
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
