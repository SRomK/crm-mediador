import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './i18n'
import App from './App.vue'

import '@/assets/styles/main.scss'

createApp(App)
  .use(createPinia())  // State management — must be before router (router uses stores)
  .use(router)
  .use(i18n)
  .mount('#app')
