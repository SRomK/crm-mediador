<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClientsStore } from '@/stores/clients'
import type { Client, ClientStatus } from '@/types'
import BaseCard from '@/components/base/BaseCard/BaseCard.vue'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseBadge from '@/components/base/BaseBadge/BaseBadge.vue'
import BaseModal from '@/components/base/BaseModal/BaseModal.vue'
import type { BadgeVariant } from '@/types'

const { t } = useI18n()
const store = useClientsStore()

onMounted(() => store.fetchClients())

const showModal = ref(false)
const saving = ref(false)

const emptyForm = (): Omit<Client, 'id' | 'createdAt'> => ({
  name: '', email: '', phone: '', status: 'prospect', assignedTo: '1',
})
const form = ref(emptyForm())

const statusBadge: Record<ClientStatus, BadgeVariant> = {
  active: 'success',
  inactive: 'neutral',
  prospect: 'info',
}

function openCreate() {
  form.value = emptyForm()
  showModal.value = true
}

async function saveClient() {
  saving.value = true
  try {
    await store.createClient(form.value)
    showModal.value = false
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="clients">
    <!-- Page header -->
    <div class="clients__header">
      <h1 class="clients__title">{{ t('clients.title') }}</h1>
      <BaseButton @click="openCreate">
        + {{ t('clients.newClient') }}
      </BaseButton>
    </div>

    <!-- Filters -->
    <BaseCard class="clients__filters">
      <div class="clients__filter-row">
        <BaseInput
          v-model="store.searchQuery"
          :placeholder="t('common.search')"
          type="search"
        />
        <select v-model="store.statusFilter" class="clients__select">
          <option value="all">{{ t('common.status') }}</option>
          <option value="active">{{ t('clients.status.active') }}</option>
          <option value="inactive">{{ t('clients.status.inactive') }}</option>
          <option value="prospect">{{ t('clients.status.prospect') }}</option>
        </select>
      </div>
    </BaseCard>

    <!-- Client table -->
    <BaseCard>
      <div class="clients__table-wrapper">
        <table class="clients__table">
          <thead>
            <tr>
              <th>{{ t('clients.name') }}</th>
              <th>{{ t('clients.email') }}</th>
              <th>{{ t('clients.phone') }}</th>
              <th>{{ t('common.status') }}</th>
              <th>{{ t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in store.filteredClients" :key="client.id" class="clients__row">
              <td class="clients__cell clients__cell--name">{{ client.name }}</td>
              <td class="clients__cell">{{ client.email }}</td>
              <td class="clients__cell">{{ client.phone }}</td>
              <td class="clients__cell">
                <BaseBadge :variant="statusBadge[client.status]" dot>
                  {{ t(`clients.status.${client.status}`) }}
                </BaseBadge>
              </td>
              <td class="clients__cell clients__cell--actions">
                <RouterLink :to="{ name: 'client-detail', params: { id: client.id } }">
                  <BaseButton variant="ghost" size="sm">{{ t('common.edit') }}</BaseButton>
                </RouterLink>
                <BaseButton
                  variant="danger"
                  size="sm"
                  @click="store.deleteClient(client.id)"
                >
                  {{ t('common.delete') }}
                </BaseButton>
              </td>
            </tr>
            <tr v-if="!store.filteredClients.length">
              <td colspan="5" class="clients__empty">{{ t('common.noResults') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <!-- Create modal -->
    <BaseModal :open="showModal" :title="t('clients.newClient')" @close="showModal = false">
      <form class="clients__form" @submit.prevent="saveClient">
        <BaseInput v-model="form.name" :label="t('clients.name')" required />
        <BaseInput v-model="form.email" :label="t('clients.email')" type="email" required />
        <BaseInput v-model="form.phone" :label="t('clients.phone')" />
      </form>

      <template #footer>
        <BaseButton variant="outline" @click="showModal = false">{{ t('common.cancel') }}</BaseButton>
        <BaseButton :loading="saving" @click="saveClient">{{ t('common.save') }}</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<style lang="scss" scoped>
.clients {
  max-width: var(--content-max-width);

  @include m.element('header') {
    @include m.flex-between;
    margin-bottom: var(--spacing-6);
  }

  @include m.element('title') {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }

  @include m.element('filters') {
    margin-bottom: var(--spacing-4);
  }

  @include m.element('filter-row') {
    display: flex;
    gap: var(--spacing-3);
    flex-wrap: wrap;
  }

  @include m.element('select') {
    height: 40px;
    padding: 0 var(--spacing-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    background-color: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
  }

  @include m.element('table-wrapper') {
    overflow-x: auto;
  }

  @include m.element('table') {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-neutral-500);
      padding: var(--spacing-3) var(--spacing-4);
      border-bottom: 1px solid var(--color-border);
    }
  }

  @include m.element('row') {
    &:hover { background-color: var(--color-neutral-50); }
    &:not(:last-child) { border-bottom: 1px solid var(--color-border); }
  }

  @include m.element('cell') {
    padding: var(--spacing-4);
    font-size: var(--font-size-sm);
    color: var(--color-text);
    vertical-align: middle;

    @include m.modifier('name') { font-weight: var(--font-weight-medium); }

    @include m.modifier('actions') {
      display: flex;
      gap: var(--spacing-2);
    }
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
}
</style>
