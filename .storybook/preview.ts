import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import i18n from '../src/i18n'

import '../src/assets/styles/main.scss'

// Register Pinia and i18n globally so stories can use them
setup((app) => {
  app.use(createPinia())
  app.use(i18n)
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    layout: 'centered',
  },
}

export default preview
