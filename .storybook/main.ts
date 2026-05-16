import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  // Forward Vite config so @ alias and SCSS auto-import work in Storybook too
  viteFinal: async (config) => {
    return config
  },
}

export default config
