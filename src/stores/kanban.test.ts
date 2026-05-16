import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useKanbanStore } from './kanban'

describe('useKanbanStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('groups tasks into columns by status', async () => {
    const store = useKanbanStore()

    await store.fetchTasks()

    expect(store.columns).toHaveLength(4)
    expect(store.columns.find((column) => column.id === 'todo')?.tasks[0].status).toBe('todo')
  })

  it('moves a task to a different column', async () => {
    const store = useKanbanStore()

    await store.fetchTasks()
    await store.moveTask('1', 'done')

    expect(store.tasks.find((task) => task.id === '1')?.status).toBe('done')
  })
})
