<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  name?: string  // Fallback initials
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

withDefaults(defineProps<Props>(), { size: 'md' })

function initials(name?: string): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<template>
  <div class="base-avatar" :class="`base-avatar--${size}`">
    <img v-if="src" :src="src" :alt="alt ?? name" class="base-avatar__img" />
    <span v-else class="base-avatar__initials" aria-label="name">{{ initials(name) }}</span>
  </div>
</template>

<style lang="scss" scoped>
.base-avatar {
  border-radius: var(--radius-full);
  overflow: hidden;
  flex-shrink: 0;
  background-color: var(--color-primary);
  @include m.flex-center;

  @include m.modifier('sm')  { width: 28px; height: 28px; }
  @include m.modifier('md')  { width: 36px; height: 36px; }
  @include m.modifier('lg')  { width: 48px; height: 48px; }
  @include m.modifier('xl')  { width: 64px; height: 64px; }

  @include m.element('img') {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include m.element('initials') {
    color: #fff;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    line-height: 1;
  }
}
</style>
