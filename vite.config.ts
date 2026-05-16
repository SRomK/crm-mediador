import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    // Allows importing .svg files as Vue components: import IconUser from '@/assets/icons/user.svg?component'
    svgLoader({ defaultImport: 'component' }),
  ],
  resolve: {
    alias: {
      // @ maps to src/ — use in every import
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Auto-inject mixins into every .scss file / <style lang="scss">
        additionalData: `@use "@/assets/styles/_mixins.scss" as m;`,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
  },
})
