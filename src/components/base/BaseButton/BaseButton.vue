<script setup lang="ts">
import type { ButtonVariant, ButtonSize } from '@/types'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  block: false,
})

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    class="base-btn"
    :class="[
      `base-btn--${variant}`,
      `base-btn--${size}`,
      { 'base-btn--loading': loading, 'base-btn--block': block },
    ]"
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <!-- Leading slot for icons -->
    <slot name="icon-left" />

    <span v-if="loading" class="base-btn__spinner" aria-hidden="true" />
    <span class="base-btn__label">
      <slot />
    </span>

    <slot name="icon-right" />
  </button>
</template>

<style lang="scss" scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast),
    border-color var(--transition-fast), box-shadow var(--transition-fast);
  white-space: nowrap;
  font-family: inherit;

  &:focus-visible {
    @include m.focus-ring;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // ─── Sizes ───────────────────────────────────────────────────────────
  @include m.modifier('sm') {
    font-size: var(--font-size-xs);
    padding: var(--spacing-1) var(--spacing-3);
    height: 32px;
  }

  @include m.modifier('md') {
    font-size: var(--font-size-sm);
    padding: var(--spacing-2) var(--spacing-4);
    height: 40px;
  }

  @include m.modifier('lg') {
    font-size: var(--font-size-base);
    padding: var(--spacing-3) var(--spacing-6);
    height: 48px;
  }

  @include m.modifier('block') {
    width: 100%;
  }

  // ─── Variants ────────────────────────────────────────────────────────
  @include m.modifier('primary') {
    background-color: var(--color-primary);
    color: #fff;

    &:hover:not(:disabled) { background-color: var(--color-primary-dark); }
  }

  @include m.modifier('secondary') {
    background-color: var(--color-secondary);
    color: #fff;

    &:hover:not(:disabled) { background-color: var(--color-secondary-light); }
  }

  @include m.modifier('outline') {
    background-color: transparent;
    border-color: var(--color-border);
    color: var(--color-text);

    &:hover:not(:disabled) { background-color: var(--color-neutral-100); }
  }

  @include m.modifier('ghost') {
    background-color: transparent;
    color: var(--color-primary);

    &:hover:not(:disabled) { background-color: var(--color-neutral-100); }
  }

  @include m.modifier('danger') {
    background-color: var(--color-danger);
    color: #fff;

    &:hover:not(:disabled) { background-color: #b91c1c; }
  }

  // ─── Spinner ─────────────────────────────────────────────────────────
  @include m.element('spinner') {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: var(--radius-full);
    animation: spin 0.6s linear infinite;
  }

  @include m.modifier('loading') {
    pointer-events: none;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
