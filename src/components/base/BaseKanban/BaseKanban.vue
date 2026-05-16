<script setup lang="ts">
/**
 * BaseKanban — generic drag-and-drop kanban board.
 * Uses native HTML5 drag events — no external library needed.
 */
import type { KanbanColumn, TaskStatus } from '@/types'
import BaseBadge from '@/components/base/BaseBadge/BaseBadge.vue'
import type { BadgeVariant } from '@/types'

defineProps<{ columns: KanbanColumn[] }>()

const emit = defineEmits<{
  moveTask: [taskId: string, newStatus: TaskStatus]
  deleteTask: [taskId: string]
}>()

const priorityVariant: Record<string, BadgeVariant> = {
  low: 'neutral',
  medium: 'warning',
  high: 'danger',
}

let draggingId: string | null = null

function onDragStart(taskId: string) {
  draggingId = taskId
}

function onDrop(columnId: TaskStatus) {
  if (draggingId) {
    emit('moveTask', draggingId, columnId)
    draggingId = null
  }
}
</script>

<template>
  <div class="kanban">
    <div
      v-for="column in columns"
      :key="column.id"
      class="kanban__column"
      @dragover.prevent
      @drop="onDrop(column.id)"
    >
      <div class="kanban__column-header">
        <span class="kanban__column-title">{{ column.label }}</span>
        <span class="kanban__column-count">{{ column.tasks.length }}</span>
      </div>

      <div class="kanban__tasks">
        <div
          v-for="task in column.tasks"
          :key="task.id"
          class="kanban__task"
          draggable="true"
          @dragstart="onDragStart(task.id)"
        >
          <div class="kanban__task-header">
            <BaseBadge :variant="priorityVariant[task.priority]" dot>
              {{ task.priority }}
            </BaseBadge>
            <button
              class="kanban__task-delete"
              aria-label="Eliminar tarea"
              @click="$emit('deleteTask', task.id)"
            >
              ✕
            </button>
          </div>

          <p class="kanban__task-title">{{ task.title }}</p>

          <div v-if="task.tags.length" class="kanban__task-tags">
            <span v-for="tag in task.tags" :key="tag" class="kanban__tag">#{{ tag }}</span>
          </div>

          <p v-if="task.dueDate" class="kanban__task-due">
            📅 {{ new Date(task.dueDate).toLocaleDateString() }}
          </p>
        </div>

        <p v-if="!column.tasks.length" class="kanban__empty">Arrastra aquí</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kanban {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-4);
  align-items: start;

  @include m.element('column') {
    background-color: var(--color-neutral-100);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    min-height: 400px;
  }

  @include m.element('column-header') {
    @include m.flex-between;
    margin-bottom: var(--spacing-4);
  }

  @include m.element('column-title') {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-sm);
    color: var(--color-neutral-700);
  }

  @include m.element('column-count') {
    background-color: var(--color-neutral-300);
    border-radius: var(--radius-full);
    padding: 2px 8px;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
  }

  @include m.element('tasks') {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }

  @include m.element('task') {
    @include m.card-surface;
    padding: var(--spacing-4);
    cursor: grab;
    transition: box-shadow var(--transition-fast), transform var(--transition-fast);

    &:active { cursor: grabbing; transform: scale(0.98); }
    &:hover { box-shadow: var(--shadow-md); }
  }

  @include m.element('task-header') {
    @include m.flex-between;
    margin-bottom: var(--spacing-2);
  }

  @include m.element('task-delete') {
    background: none;
    border: none;
    font-size: var(--font-size-xs);
    color: var(--color-neutral-400);
    cursor: pointer;
    padding: 2px 4px;
    border-radius: var(--radius-sm);

    &:hover { background-color: var(--color-neutral-200); color: var(--color-danger); }
  }

  @include m.element('task-title') {
    font-size: var(--font-size-sm);
    color: var(--color-neutral-900);
    margin-bottom: var(--spacing-2);
  }

  @include m.element('task-tags') {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
  }

  @include m.element('tag') {
    font-size: var(--font-size-xs);
    color: var(--color-primary);
  }

  @include m.element('task-due') {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    margin-top: var(--spacing-2);
  }

  @include m.element('empty') {
    text-align: center;
    color: var(--color-neutral-400);
    font-size: var(--font-size-sm);
    padding: var(--spacing-8) 0;
    border: 2px dashed var(--color-border);
    border-radius: var(--radius-lg);
  }
}
</style>
