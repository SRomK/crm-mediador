import api from './api'
import type { Client } from '@/types'

// Seed mock data for development
const mockClients: Client[] = [
  { id: '1', name: 'Carlos López', email: 'carlos@example.com', phone: '600111222', status: 'active', assignedTo: '1', createdAt: '2024-01-10T09:00:00Z' },
  { id: '2', name: 'María Fernández', email: 'maria@example.com', phone: '600333444', status: 'prospect', assignedTo: '1', createdAt: '2024-02-15T11:30:00Z' },
  { id: '3', name: 'Pedro Ruiz', email: 'pedro@example.com', phone: '600555666', status: 'inactive', assignedTo: '1', createdAt: '2024-03-01T08:00:00Z' },
  { id: '4', name: 'Laura Sánchez', email: 'laura@example.com', phone: '600777888', status: 'active', assignedTo: '1', createdAt: '2024-03-20T14:00:00Z' },
]

let localClients = [...mockClients]

function devOrApi<T>(devFn: () => Promise<T>, apiFn: () => Promise<T>): Promise<T> {
  return import.meta.env.DEV ? devFn() : apiFn()
}

export const clientsService = {
  getAll(): Promise<Client[]> {
    return devOrApi(
      async () => localClients,
      async () => { const { data } = await api.get<Client[]>('/clients'); return data },
    )
  },

  getById(id: string): Promise<Client> {
    return devOrApi(
      async () => {
        const c = localClients.find((c) => c.id === id)
        if (!c) throw new Error('Client not found')
        return c
      },
      async () => { const { data } = await api.get<Client>(`/clients/${id}`); return data },
    )
  },

  create(data: Omit<Client, 'id' | 'createdAt'>): Promise<Client> {
    return devOrApi(
      async () => {
        const newClient: Client = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() }
        localClients.unshift(newClient)
        return newClient
      },
      async () => { const { data: res } = await api.post<Client>('/clients', data); return res },
    )
  },

  update(id: string, data: Partial<Client>): Promise<Client> {
    return devOrApi(
      async () => {
        const idx = localClients.findIndex((c) => c.id === id)
        localClients[idx] = { ...localClients[idx], ...data }
        return localClients[idx]
      },
      async () => { const { data: res } = await api.patch<Client>(`/clients/${id}`, data); return res },
    )
  },

  delete(id: string): Promise<void> {
    return devOrApi(
      async () => { localClients = localClients.filter((c) => c.id !== id) },
      async () => { await api.delete(`/clients/${id}`) },
    )
  },
}
