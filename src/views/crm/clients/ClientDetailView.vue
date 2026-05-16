<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useClientsStore } from '@/stores/clients'
import type { Client } from '@/types'
import BaseCard from '@/components/base/BaseCard/BaseCard.vue'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseBadge from '@/components/base/BaseBadge/BaseBadge.vue'

const props = defineProps<{ id: string }>()
const { t } = useI18n()
const router = useRouter()
const store = useClientsStore()

const client = ref<Client | null>(null)
const form = ref<Partial<Client>>({})
const saving = ref(false)

onMounted(async () => {
  // Try local store first, then fetch if missing
  client.value = store.clients.find((c) => c.id === props.id) ?? null
  if (client.value) form.value = { ...client.value }
})

async function save() {
  saving.value = true
  try {
    await store.updateClient(props.id, form.value)
    router.push({ name: 'clients' })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="client-detail">
    <div class="client-detail__header">
      <BaseButton variant="ghost" @click="router.back()">← {{ t('common.back') }}</BaseButton>
      <h1 class="client-detail__title">{{ client?.name ?? '—' }}</h1>
      <BaseBadge v-if="client" :variant="client.status === 'active' ? 'success' : 'neutral'" dot>
        {{ t(`clients.status.${client.status}`) }}
      </BaseBadge>
    </div>

    <BaseCard v-if="form.name !== undefined" :title="t('common.edit')">
      <form class="client-detail__form" @submit.prevent="save">
        <BaseInput v-model="form.name" :label="t('clients.name')" required />
        <BaseInput v-model="form.email" :label="t('clients.email')" type="email" required />
        <BaseInput v-model="form.phone" :label="t('clients.phone')" />

        <label class="client-detail__label">{{ t('common.status') }}</label>
        <select v-model="form.status" class="client-detail__select">
          <option value="active">{{ t('clients.status.active') }}</option>
          <option value="inactive">{{ t('clients.status.inactive') }}</option>
          <option value="prospect">{{ t('clients.status.prospect') }}</option>
        </select>
      </form>

      <template #footer>
        <BaseButton variant="outline" @click="router.back()">{{ t('common.cancel') }}</BaseButton>
        <BaseButton :loading="saving" @click="save">{{ t('common.save') }}</BaseButton>
      </template>
    </BaseCard>
  </div>
</template>

<style lang="scss" scoped>
.client-detail {
  max-width: 640px;

  @include m.element('header') {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-6);
    flex-wrap: wrap;
  }

  @include m.element('title') {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    flex: 1;
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
