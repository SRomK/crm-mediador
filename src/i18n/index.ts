import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

// The stored locale or browser default, falling back to Spanish
const storedLocale = localStorage.getItem('crm_locale')
const browserLocale = navigator.language.split('-')[0]
const defaultLocale = storedLocale ?? (browserLocale === 'en' ? 'en' : 'es')

const i18n = createI18n({
  legacy: false,          // Use Composition API mode (useI18n)
  locale: defaultLocale,
  fallbackLocale: 'es',
  messages: { es, en },
})

export default i18n

// Helper to switch locale and persist
export function setLocale(locale: 'es' | 'en') {
  i18n.global.locale.value = locale
  localStorage.setItem('crm_locale', locale)
}
