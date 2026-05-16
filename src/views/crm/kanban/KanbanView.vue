<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useKanbanStore } from '@/stores/kanban'
import type { KanbanTask } from '@/types'
import BaseKanban from '@/components/base/BaseKanban/BaseKanban.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'

const { t } = useI18n()
const store = useKanbanStore()

onMounted(() => store.fetchTasks())

const showModal = ref(false)
const saving = ref(false)

const emptyForm = (): Omit<KanbanTask, 'id'> => ({
  title: '',
  status: 'todo',
  priority: 'medium',
  tags: [],
  userId: '1',
})
const form = ref(emptyForm())

async function save() {
  saving.value = true
  try {
    await store.createTask(form.value)
    showModal.value = false
    form.value = emptyForm()
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="kanban-view">
    <div class="kanban-view__header">
      <h1 class="kanban-view__title">{{ t('kanban.title') }}</h1>
      <BaseButton @click="showModal = true">+ {{ t('kanban.newTask') }}</BaseButton>
    </div>

    <BaseKanban
      :columns="store.columns"
      @move-task="store.moveTask"
      @delete-task="store.deleteTask"
    />

    <BaseModal :open="showModal" :title="t('kanban.newTask')" @close="showModal = false">
      <form class="kanban-view__form" @submit.prevent="save">
        <BaseInput v-model="form.title" label="Título" required />

        <label class="kanban-view__label">Prioridad</label>
        <select v-model="form.priority" class="kanban-view__select">
          <option value="low">{{ t('kanban.priority.low') }}</option>
          <option value="medium">{{ t('kanban.priority.medium') }}</option>
          <option value="high">{{ t('kanban.priority.high') }}</option>
        </select>

        <label class="kanban-view__label">Columna inicial</label>
        <select v-model="form.status" class="kanban-view__select">
          <option value="todo">{{ t('kanban.columns.todo') }}</option>
          <option value="in-progress">{{ t('kanban.columns.in-progress') }}</option>
          <option value="review">{{ t('kanban.columns.review') }}</option>
          <option value="done">{{ t('kanban.columns.done') }}</option>
        </select>
      </form>

      <template #footer>
        <BaseButton variant="outline" @click="showModal = false">{{ t('common.cancel') }}</BaseButton>
        <BaseButton :loading="saving" @click="save">{{ t('common.save') }}</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<style lang="scss" scoped>
.kanban-view {
  @include m.element('header') {
    @include m.flex-between;
    margin-bottom: var(--spacing-6);
  }

  @include m.element('title') {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }

  @include m.element('form') {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  @include m.element('label') {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-neutral-700);
  }

  @include m.element('select') {
    height: 40px;
    padding: 0 var(--spacing-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    background-color: var(--color-surface);
    width: 100%;
  }
}
</style>
