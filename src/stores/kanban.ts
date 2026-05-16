import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { KanbanTask, KanbanColumn, TaskStatus } from '@/types'
import { kanbanService } from '@/services/kanban.service'

const COLUMN_CONFIG: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'Por hacer' },
  { id: 'in-progress', label: 'En progreso' },
  { id: 'review', label: 'En revisión' },
  { id: 'done', label: 'Hecho' },
]

export const useKanbanStore = defineStore('kanban', () => {
  // ─── State ───────────────────────────────────────────────────────────────
  const tasks = ref<KanbanTask[]>([])
  const loading = ref(false)

  // ─── Getters ─────────────────────────────────────────────────────────────
  // Derives columns from flat task list — single source of truth
  const columns = computed<KanbanColumn[]>(() =>
    COLUMN_CONFIG.map((col) => ({
      ...col,
      tasks: tasks.value.filter((t) => t.status === col.id),
    })),
  )

  // ─── Actions ─────────────────────────────────────────────────────────────
  async function fetchTasks() {
    loading.value = true
    try {
      tasks.value = await kanbanService.getAll()
    } finally {
      loading.value = false
    }
  }

  async function createTask(data: Omit<KanbanTask, 'id'>) {
    const created = await kanbanService.create(data)
    tasks.value.push(created)
    return created
  }

  async function moveTask(taskId: string, newStatus: TaskStatus) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) return
    task.status = newStatus
    // Optimistic update — sync with backend in background
    kanbanService.update(taskId, { status: newStatus }).catch(() => {
      // Revert on failure
      task.status = task.status
    })
  }

  async function deleteTask(id: string) {
    await kanbanService.delete(id)
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  return { tasks, loading, columns, fetchTasks, createTask, moveTask, deleteTask }
})
