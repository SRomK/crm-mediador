<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseIcon from '@/components/base/BaseIcon/BaseIcon.vue'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const navItems = [
  { name: 'dashboard', icon: 'dashboard', label: () => t('nav.dashboard') },
  { name: 'clients',   icon: 'user',      label: () => t('nav.clients') },
  { name: 'agenda',    icon: 'calendar',  label: () => t('nav.agenda') },
  { name: 'kanban',    icon: 'kanban',    label: () => t('nav.kanban') },
]

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <!-- Overlay for mobile -->
  <div
    v-if="open"
    class="sidebar-overlay"
    @click="$emit('close')"
  />

  <aside class="sidebar" :class="{ 'sidebar--open': open }">
    <!-- Logo -->
    <div class="sidebar__logo">
      <span class="sidebar__logo-text">CRM Mediador</span>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="sidebar__nav-item"
        active-class="sidebar__nav-item--active"
      >
        <BaseIcon :name="item.icon" :size="20" />
        <span class="sidebar__nav-label">{{ item.label() }}</span>
      </RouterLink>
    </nav>

    <!-- Logout -->
    <button class="sidebar__logout" @click="logout">
      <BaseIcon name="logout" :size="20" />
      <span>{{ t('nav.logout') }}</span>
    </button>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.4);
  z-index: calc(var(--z-sticky) - 1);

  @include m.respond-to('lg') {
    display: none;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--sidebar-width);
  background-color: var(--color-neutral-900);
  display: flex;
  flex-direction: column;
  z-index: var(--z-sticky);
  // Mobile: hidden off-screen by default
  transform: translateX(-100%);
  transition: transform var(--transition-base), width var(--transition-base);

  // Mobile: slide in when open
  @include m.modifier('open') {
    transform: translateX(0);
  }

  // Desktop: in-flow (sticky), collapse via width when closed
  @include m.respond-to('lg') {
    position: sticky;
    top: 0;
    height: 100vh;
    transform: translateX(0); // always in-place, never slides
    flex-shrink: 0;
    overflow: hidden;

    // Collapsed state: shrink width so content takes the freed space
    &:not(.sidebar--open) {
      width: 0;
    }
  }

  @include m.element('logo') {
    padding: var(--spacing-6);
    border-bottom: 1px solid var(--color-neutral-700);
  }

  @include m.element('logo-text') {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-light);
    letter-spacing: -0.02em;
  }

  @include m.element('nav') {
    flex: 1;
    padding: var(--spacing-4) var(--spacing-2);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  @include m.element('nav-item') {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    padding: var(--spacing-3) var(--spacing-4);
    border-radius: var(--radius-lg);
    color: var(--color-neutral-400);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    transition: background-color var(--transition-fast), color var(--transition-fast);
    text-decoration: none;

    &:hover {
      background-color: var(--color-neutral-800);
      color: var(--color-neutral-100);
    }

    &--active {
      background-color: var(--color-primary);
      color: #fff;
    }
  }

  @include m.element('nav-label') {
    @include m.truncate;
  }

  @include m.element('logout') {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    padding: var(--spacing-4) var(--spacing-6);
    border-top: 1px solid var(--color-neutral-700);
    background: none;
    border-left: none;
    border-right: none;
    border-bottom: none;
    color: var(--color-neutral-400);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-danger);
    }
  }
}
</style>
