<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

interface Props {
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true,
})

const emit = defineEmits<{ close: [] }>()

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="closeOnBackdrop && $emit('close')">
        <div
          class="modal"
          :class="`modal--${size}`"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <!-- Header -->
          <div class="modal__header">
            <h2 class="modal__title">{{ title }}</h2>
            <button class="modal__close" @click="$emit('close')" aria-label="Cerrar">✕</button>
          </div>

          <!-- Body -->
          <div class="modal__body">
            <slot />
          </div>

          <!-- Footer slot -->
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  @include m.flex-center;
  z-index: var(--z-modal);
  padding: var(--spacing-4);
}

.modal {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @include m.modifier('sm') { max-width: 400px; }
  @include m.modifier('md') { max-width: 560px; }
  @include m.modifier('lg') { max-width: 800px; }

  @include m.element('header') {
    @include m.flex-between;
    padding: var(--spacing-4) var(--spacing-6);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  @include m.element('title') {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-neutral-900);
  }

  @include m.element('close') {
    background: none;
    border: none;
    font-size: var(--font-size-lg);
    color: var(--color-neutral-500);
    cursor: pointer;
    padding: var(--spacing-1);
    border-radius: var(--radius-md);
    line-height: 1;

    &:hover { background-color: var(--color-neutral-100); color: var(--color-neutral-900); }
  }

  @include m.element('body') {
    padding: var(--spacing-6);
    overflow-y: auto;
    flex: 1;
  }

  @include m.element('footer') {
    padding: var(--spacing-4) var(--spacing-6);
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-3);
    flex-shrink: 0;
  }
}

// ─── Transition ──────────────────────────────────────────────────────────────
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-base);

  .modal { transition: transform var(--transition-base); }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal { transform: scale(0.95) translateY(-8px); }
}
</style>
