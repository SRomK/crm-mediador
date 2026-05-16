<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClientsStore } from '@/stores/clients'
import { useAgendaStore } from '@/stores/agenda'
import { useKanbanStore } from '@/stores/kanban'
import BaseCard from '@/components/base/BaseCard/BaseCard.vue'
import BaseBadge from '@/components/base/BaseBadge/BaseBadge.vue'

const { t } = useI18n()
const clientsStore = useClientsStore()
const agendaStore = useAgendaStore()
const kanbanStore = useKanbanStore()

onMounted(async () => {
  await Promise.all([
    clientsStore.fetchClients(),
    agendaStore.fetchAppointments(),
    kanbanStore.fetchTasks(),
  ])
})

const stats = computed(() => [
  { label: t('dashboard.totalClients'), value: clientsStore.clients.length, color: 'var(--color-primary)' },
  { label: t('dashboard.upcomingAppointments'), value: agendaStore.upcomingAppointments.length, color: 'var(--color-info)' },
  { label: t('dashboard.pendingTasks'), value: kanbanStore.tasks.filter((t) => t.status !== 'done').length, color: 'var(--color-warning)' },
])

const appointmentTypeIcon: Record<string, string> = {
  meeting: '🤝',
  call: '📞',
  reminder: '🔔',
}
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">{{ t('dashboard.title') }}</h1>

    <!-- Stats row -->
    <div class="dashboard__stats">
      <BaseCard v-for="stat in stats" :key="stat.label" class="dashboard__stat-card">
        <div class="dashboard__stat">
          <p class="dashboard__stat-value" :style="{ color: stat.color }">{{ stat.value }}</p>
          <p class="dashboard__stat-label">{{ stat.label }}</p>
        </div>
      </BaseCard>
    </div>

    <!-- Upcoming appointments -->
    <BaseCard :title="t('dashboard.upcomingAppointments')" class="dashboard__section">
      <ul class="dashboard__appointments">
        <li
          v-for="appt in agendaStore.upcomingAppointments"
          :key="appt.id"
          class="dashboard__appointment"
        >
          <span class="dashboard__appointment-icon">{{ appointmentTypeIcon[appt.type] }}</span>
          <div>
            <p class="dashboard__appointment-title">{{ appt.title }}</p>
            <p class="dashboard__appointment-date">
              {{ new Date(appt.date).toLocaleString() }} · {{ appt.duration }} min
            </p>
          </div>
          <BaseBadge :variant="appt.type === 'meeting' ? 'info' : appt.type === 'call' ? 'success' : 'warning'">
            {{ appt.type }}
          </BaseBadge>
        </li>
        <li v-if="!agendaStore.upcomingAppointments.length" class="dashboard__empty">
          {{ t('common.noResults') }}
        </li>
      </ul>
    </BaseCard>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  max-width: var(--content-max-width);

  @include m.element('title') {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-neutral-900);
    margin-bottom: var(--spacing-6);
  }

  @include m.element('stats') {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-8);

    @include m.respond-to('md') { grid-template-columns: repeat(3, 1fr); }
  }

  @include m.element('stat') {
    text-align: center;
    padding: var(--spacing-2);
  }

  @include m.element('stat-value') {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    line-height: 1;
    margin-bottom: var(--spacing-2);
  }

  @include m.element('stat-label') {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }

  @include m.element('section') {
    margin-bottom: var(--spacing-6);
  }

  @include m.element('appointments') {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }

  @include m.element('appointment') {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding: var(--spacing-3) 0;
    border-bottom: 1px solid var(--color-border);

    &:last-child { border-bottom: none; }
  }

  @include m.element('appointment-icon') {
    font-size: var(--font-size-xl);
    flex-shrink: 0;
  }

  @include m.element('appointment-title') {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
  }

  @include m.element('appointment-date') {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    margin-top: 2px;
  }

  @include m.element('empty') {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    text-align: center;
    padding: var(--spacing-6);
  }
}
</style>
