<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { setLocale } from '@/i18n'
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/components/base/BaseIcon/BaseIcon.vue'

defineEmits<{ toggleSidebar: [] }>()

const authStore = useAuthStore()
const { locale } = useI18n()

function switchLocale() {
  const next = locale.value === 'es' ? 'en' : 'es'
  setLocale(next as 'es' | 'en')
}
</script>

<template>
  <header class="app-header">
    <button
      class="app-header__menu-btn"
      aria-label="Toggle sidebar"
      @click="$emit('toggleSidebar')"
    >
      <BaseIcon name="dashboard" :size="22" />
    </button>

    <div class="app-header__right">
      <!-- Locale switcher -->
      <button class="app-header__locale" @click="switchLocale">
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>

      <!-- User info -->
      <div class="app-header__user" v-if="authStore.user">
        <img
          v-if="authStore.user.avatar"
          :src="authStore.user.avatar"
          :alt="authStore.user.name"
          class="app-header__avatar"
        />
        <span class="app-header__name">{{ authStore.user.name }}</span>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  height: var(--header-height);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 0 var(--spacing-6);
  @include m.flex-between;
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);

  @include m.element('menu-btn') {
    background: none;
    border: none;
    padding: var(--spacing-2);
    border-radius: var(--radius-md);
    color: var(--color-neutral-600);
    cursor: pointer;
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: var(--color-neutral-100);
    }
  }

  @include m.element('right') {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }

  @include m.element('locale') {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-neutral-600);
    cursor: pointer;

    &:hover {
      background-color: var(--color-neutral-100);
    }
  }

  @include m.element('user') {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  @include m.element('avatar') {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    object-fit: cover;
  }

  @include m.element('name') {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-neutral-700);

    @include m.respond-to('md') {
      display: block;
    }
  }
}
</style>
