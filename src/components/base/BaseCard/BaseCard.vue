<script setup lang="ts">
interface Props {
  title?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: true,
})
</script>

<template>
  <div class="base-card" :class="[`base-card--pad-${padding}`, { 'base-card--shadow': shadow }]">
    <div v-if="title || $slots.header" class="base-card__header">
      <slot name="header">
        <h3 class="base-card__title">{{ title }}</h3>
      </slot>
    </div>

    <div class="base-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  @include m.card-surface;
  overflow: hidden;

  @include m.modifier('shadow') { box-shadow: var(--shadow-md); }

  @include m.modifier('pad-none') {
    .base-card__body { padding: 0; }
  }
  @include m.modifier('pad-sm') {
    .base-card__body { padding: var(--spacing-4); }
  }
  @include m.modifier('pad-md') {
    .base-card__body { padding: var(--spacing-6); }
  }
  @include m.modifier('pad-lg') {
    .base-card__body { padding: var(--spacing-8); }
  }

  @include m.element('header') {
    padding: var(--spacing-4) var(--spacing-6);
    border-bottom: 1px solid var(--color-border);
    @include m.flex-between;
  }

  @include m.element('title') {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-neutral-900);
  }

  @include m.element('body') {
    padding: var(--spacing-6);
  }

  @include m.element('footer') {
    padding: var(--spacing-4) var(--spacing-6);
    border-top: 1px solid var(--color-border);
    background-color: var(--color-neutral-50);
  }
}
</style>
