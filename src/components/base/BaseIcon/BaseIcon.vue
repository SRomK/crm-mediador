<script setup lang="ts">
/**
 * BaseIcon — renders an inline SVG icon using vite-svg-loader.
 *
 * Usage:
 *   <BaseIcon name="user" :size="20" />
 *
 * Icons are imported dynamically from src/assets/icons/svg/*.svg
 */

import { defineAsyncComponent, computed } from 'vue'

interface Props {
  name: string
  size?: number | string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
  color: 'currentColor',
})

// Dynamic async import — vite-svg-loader converts SVG to a Vue component
const IconComponent = computed(() =>
  defineAsyncComponent(
    () => import(`../../../assets/icons/svg/${props.name}.svg`) as Promise<{ default: object }>,
  ),
)
</script>

<template>
  <component
    :is="IconComponent"
    class="base-icon"
    :style="{ width: `${size}px`, height: `${size}px`, color }"
    aria-hidden="true"
  />
</template>

<style lang="scss" scoped>
.base-icon {
  display: inline-flex;
  flex-shrink: 0;
}
</style>
