<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const sidebarOpen = ref(true)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="app-layout" :class="{ 'app-layout--collapsed': !sidebarOpen }">
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="app-layout__main">
      <AppHeader @toggle-sidebar="toggleSidebar" />

      <main class="app-layout__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;

  @include m.element('main') {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; // prevent flex overflow
    transition: margin-left var(--transition-base);
  }

  @include m.element('content') {
    flex: 1;
    padding: var(--spacing-6);
    overflow-y: auto;

    @include m.respond-to('lg') {
      padding: var(--spacing-8);
    }
  }
}
</style>
