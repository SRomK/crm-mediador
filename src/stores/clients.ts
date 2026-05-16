import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Client, ClientStatus } from '@/types'
import { clientsService } from '@/services/clients.service'

export const useClientsStore = defineStore('clients', () => {
  // ─── State ───────────────────────────────────────────────────────────────
  const clients = ref<Client[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const statusFilter = ref<ClientStatus | 'all'>('all')

  // ─── Getters ─────────────────────────────────────────────────────────────
  const filteredClients = computed(() => {
    return clients.value.filter((c) => {
      const matchesSearch =
        !searchQuery.value ||
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesStatus = statusFilter.value === 'all' || c.status === statusFilter.value

      return matchesSearch && matchesStatus
    })
  })

  const totalByStatus = computed(() => ({
    active: clients.value.filter((c) => c.status === 'active').length,
    inactive: clients.value.filter((c) => c.status === 'inactive').length,
    prospect: clients.value.filter((c) => c.status === 'prospect').length,
  }))

  // ─── Actions ─────────────────────────────────────────────────────────────
  async function fetchClients() {
    loading.value = true
    error.value = null
    try {
      clients.value = await clientsService.getAll()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error fetching clients'
    } finally {
      loading.value = false
    }
  }

  async function createClient(data: Omit<Client, 'id' | 'createdAt'>) {
    const newClient = await clientsService.create(data)
    clients.value.unshift(newClient)
    return newClient
  }

  async function updateClient(id: string, data: Partial<Client>) {
    const updated = await clientsService.update(id, data)
    const idx = clients.value.findIndex((c) => c.id === id)
    if (idx !== -1) clients.value[idx] = updated
    return updated
  }

  async function deleteClient(id: string) {
    await clientsService.delete(id)
    clients.value = clients.value.filter((c) => c.id !== id)
  }

  return {
    clients,
    loading,
    error,
    searchQuery,
    statusFilter,
    filteredClients,
    totalByStatus,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  }
})
