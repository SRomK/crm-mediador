<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAgendaStore } from '@/stores/agenda'
import type { Appointment } from '@/types'
import BaseCard from '@/components/base/BaseCard/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'
import BaseBadge from '@/components/base/BaseBadge/BaseBadge.vue'
import type { BadgeVariant } from '@/types'

const { t } = useI18n()
const store = useAgendaStore()

onMounted(() => store.fetchAppointments())

const showModal = ref(false)
const saving = ref(false)

const emptyForm = (): Omit<Appointment, 'id'> => ({
  title: '',
  date: new Date().toISOString().slice(0, 16),
  duration: 30,
  type: 'meeting',
  userId: '1',
})
const form = ref(emptyForm())

const typeBadge: Record<string, BadgeVariant> = {
  meeting: 'info',
  call: 'success',
  reminder: 'warning',
}

async function save() {
  saving.value = true
  try {
    await store.createAppointment(form.value)
    showModal.value = false
    form.value = emptyForm()
  } finally {
    saving.value = false
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<template>
  <div class="agenda">
    <div class="agenda__header">
      <h1 class="agenda__title">{{ t('agenda.title') }}</h1>
      <BaseButton @click="showModal = true">+ {{ t('agenda.newAppointment') }}</BaseButton>
    </div>

    <BaseCard>
      <ul class="agenda__list">
        <li
          v-for="appt in store.appointments.slice().sort((a, b) => a.date.localeCompare(b.date))"
          :key="appt.id"
          class="agenda__item"
        >
          <div class="agenda__item-left">
            <p class="agenda__item-date">{{ formatDate(appt.date) }}</p>
            <p class="agenda__item-title">{{ appt.title }}</p>
            <p class="agenda__item-duration">{{ appt.duration }} min</p>
          </div>
          <div class="agenda__item-right">
            <BaseBadge :variant="typeBadge[appt.type]">
              {{ t(`agenda.type.${appt.type}`) }}
            </BaseBadge>
            <BaseButton variant="danger" size="sm" @click="store.deleteAppointment(appt.id)">
              {{ t('common.delete') }}
            </BaseButton>
          </div>
        </li>

        <li v-if="!store.appointments.length" class="agenda__empty">
          {{ t('common.noResults') }}
        </li>
      </ul>
    </BaseCard>

    <BaseModal :open="showModal" :title="t('agenda.newAppointment')" @close="showModal = false">
      <form class="agenda__form" @submit.prevent="save">
        <BaseInput v-model="form.title" :label="t('agenda.appointmentTitle')" required />
        <BaseInput v-model="form.date" :label="t('agenda.date')" type="datetime-local" required />
        <BaseInput v-model.number="form.duration" :label="t('agenda.duration')" type="number" />

        <label class="agenda__label">Tipo</label>
        <select v-model="form.type" class="agenda__select">
          <option value="meeting">{{ t('agenda.type.meeting') }}</option>
          <option value="call">{{ t('agenda.type.call') }}</option>
          <option value="reminder">{{ t('agenda.type.reminder') }}</option>
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
.agenda {
  max-width: var(--content-max-width);

  @include m.element('header') {
    @include m.flex-between;
    margin-bottom: var(--spacing-6);
  }

  @include m.element('title') {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }

  @include m.element('list') {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  @include m.element('item') {
    @include m.flex-between;
    padding: var(--spacing-4) 0;
    border-bottom: 1px solid var(--color-border);
    gap: var(--spacing-4);
    flex-wrap: wrap;

    &:last-child { border-bottom: none; }
  }

  @include m.element('item-left') {
    flex: 1;
  }

  @include m.element('item-date') {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-1);
  }

  @include m.element('item-title') {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
  }

  @include m.element('item-duration') {
    font-size: var(--font-size-xs);
    color: var(--color-neutral-400);
    margin-top: 2px;
  }

  @include m.element('item-right') {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  @include m.element('empty') {
    text-align: center;
    padding: var(--spacing-12);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
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
