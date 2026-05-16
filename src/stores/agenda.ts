import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Appointment } from '@/types'
import { agendaService } from '@/services/agenda.service'

export const useAgendaStore = defineStore('agenda', () => {
  // ─── State ───────────────────────────────────────────────────────────────
  const appointments = ref<Appointment[]>([])
  const loading = ref(false)
  const selectedDate = ref<string>(new Date().toISOString().split('T')[0]) // YYYY-MM-DD

  // ─── Getters ─────────────────────────────────────────────────────────────
  const appointmentsForSelectedDate = computed(() =>
    appointments.value.filter((a) => a.date.startsWith(selectedDate.value)),
  )

  const upcomingAppointments = computed(() => {
    const now = new Date().toISOString()
    return appointments.value
      .filter((a) => a.date >= now)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5)
  })

  // ─── Actions ─────────────────────────────────────────────────────────────
  async function fetchAppointments() {
    loading.value = true
    try {
      appointments.value = await agendaService.getAll()
    } finally {
      loading.value = false
    }
  }

  async function createAppointment(data: Omit<Appointment, 'id'>) {
    const created = await agendaService.create(data)
    appointments.value.push(created)
    return created
  }

  async function deleteAppointment(id: string) {
    await agendaService.delete(id)
    appointments.value = appointments.value.filter((a) => a.id !== id)
  }

  function setSelectedDate(date: string) {
    selectedDate.value = date
  }

  return {
    appointments,
    loading,
    selectedDate,
    appointmentsForSelectedDate,
    upcomingAppointments,
    fetchAppointments,
    createAppointment,
    deleteAppointment,
    setSelectedDate,
  }
})
