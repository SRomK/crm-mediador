import api from './api'
import type { Appointment } from '@/types'

const mockAppointments: Appointment[] = [
  { id: '1', title: 'Reunión inicial', date: '2026-05-16T10:00:00Z', duration: 60, type: 'meeting', clientId: '1', userId: '1' },
  { id: '2', title: 'Seguimiento póliza', date: '2026-05-16T12:00:00Z', duration: 30, type: 'call', clientId: '2', userId: '1' },
  { id: '3', title: 'Renovación contrato', date: '2026-05-20T09:00:00Z', duration: 45, type: 'meeting', clientId: '3', userId: '1' },
]

let localAppointments = [...mockAppointments]

export const agendaService = {
  async getAll(): Promise<Appointment[]> {
    if (import.meta.env.DEV) return localAppointments
    const { data } = await api.get<Appointment[]>('/appointments')
    return data
  },

  async create(data: Omit<Appointment, 'id'>): Promise<Appointment> {
    if (import.meta.env.DEV) {
      const created: Appointment = { ...data, id: Date.now().toString() }
      localAppointments.push(created)
      return created
    }
    const { data: res } = await api.post<Appointment>('/appointments', data)
    return res
  },

  async delete(id: string): Promise<void> {
    if (import.meta.env.DEV) {
      localAppointments = localAppointments.filter((a) => a.id !== id)
      return
    }
    await api.delete(`/appointments/${id}`)
  },
}
