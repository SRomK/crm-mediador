<script setup lang="ts">
import type { BadgeVariant } from '@/types'

interface Props {
  variant?: BadgeVariant
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  dot: false,
})
</script>

<template>
  <span class="base-badge" :class="`base-badge--${variant}`">
    <span v-if="dot" class="base-badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;

  @include m.element('dot') {
    width: 6px;
    height: 6px;
    border-radius: var(--radius-full);
    background-color: currentColor;
  }

  @include m.modifier('success')  { background-color: #dcfce7; color: #166534; }
  @include m.modifier('warning')  { background-color: #fef9c3; color: #854d0e; }
  @include m.modifier('danger')   { background-color: #fee2e2; color: #991b1b; }
  @include m.modifier('info')     { background-color: #e0f2fe; color: #075985; }
  @include m.modifier('neutral')  { background-color: var(--color-neutral-100); color: var(--color-neutral-600); }
}
</style>
