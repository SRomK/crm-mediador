import api from './api'
import type { KanbanTask } from '@/types'

const mockTasks: KanbanTask[] = [
  { id: '1', title: 'Revisar propuesta de seguro de vida', status: 'todo', priority: 'high', tags: ['seguros', 'propuesta'], userId: '1' },
  { id: '2', title: 'Llamar a Carlos López', status: 'in-progress', priority: 'medium', clientId: '1', tags: ['llamada'], userId: '1' },
  { id: '3', title: 'Enviar documentación a María', status: 'review', priority: 'medium', clientId: '2', tags: ['docs'], userId: '1' },
  { id: '4', title: 'Actualizar datos de Pedro', status: 'done', priority: 'low', clientId: '3', tags: [], userId: '1' },
] as KanbanTask[]

let localTasks = [...mockTasks]

export const kanbanService = {
  async getAll(): Promise<KanbanTask[]> {
    if (import.meta.env.DEV) return localTasks
    const { data } = await api.get<KanbanTask[]>('/tasks')
    return data
  },

  async create(data: Omit<KanbanTask, 'id'>): Promise<KanbanTask> {
    if (import.meta.env.DEV) {
      const created: KanbanTask = { ...data, id: Date.now().toString() }
      localTasks.push(created)
      return created
    }
    const { data: res } = await api.post<KanbanTask>('/tasks', data)
    return res
  },

  async update(id: string, data: Partial<KanbanTask>): Promise<KanbanTask> {
    if (import.meta.env.DEV) {
      const idx = localTasks.findIndex((t) => t.id === id)
      localTasks[idx] = { ...localTasks[idx], ...data }
      return localTasks[idx]
    }
    const { data: res } = await api.patch<KanbanTask>(`/tasks/${id}`, data)
    return res
  },

  async delete(id: string): Promise<void> {
    if (import.meta.env.DEV) {
      localTasks = localTasks.filter((t) => t.id !== id)
      return
    }
    await api.delete(`/tasks/${id}`)
  },
}
