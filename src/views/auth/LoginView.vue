<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'

const { t } = useI18n()
const { login } = useAuth()

const form = reactive({ email: 'demo@crm.com', password: 'demo1234' })
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    await login(form.email, form.password)
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : t('auth.loginError')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__card">
      <h1 class="login-page__title">CRM Mediador</h1>
      <p class="login-page__subtitle">{{ t('auth.login') }}</p>

      <form class="login-page__form" @submit.prevent="handleSubmit" novalidate>
        <BaseInput
          v-model="form.email"
          :label="t('auth.email')"
          type="email"
          placeholder="tu@email.com"
          required
        />
        <BaseInput
          v-model="form.password"
          :label="t('auth.password')"
          type="password"
          placeholder="••••••••"
          required
        />

        <p v-if="error" class="login-page__error" role="alert">{{ error }}</p>

        <BaseButton type="submit" :loading="loading" block>
          {{ t('auth.loginButton') }}
        </BaseButton>

        <p class="login-page__hint">Demo: demo@crm.com / demo1234</p>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%);
  @include m.flex-center;
  padding: var(--spacing-4);

  @include m.element('card') {
    @include m.card-surface;
    width: 100%;
    max-width: 420px;
    padding: var(--spacing-8);
    box-shadow: var(--shadow-xl);
  }

  @include m.element('title') {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
    text-align: center;
    margin-bottom: var(--spacing-1);
  }

  @include m.element('subtitle') {
    text-align: center;
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-8);
  }

  @include m.element('form') {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  @include m.element('error') {
    background-color: #fee2e2;
    color: var(--color-danger);
    font-size: var(--font-size-sm);
    padding: var(--spacing-3);
    border-radius: var(--radius-md);
    text-align: center;
  }

  @include m.element('hint') {
    font-size: var(--font-size-xs);
    color: var(--color-neutral-400);
    text-align: center;
  }
}
</style>
