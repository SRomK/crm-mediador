import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from './LoginView.vue'

const login = vi.fn()

vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({
    login,
  }),
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

describe('LoginView', () => {
  it('submits the demo credentials through the auth composable', async () => {
    const wrapper = mount(LoginView)

    await wrapper.find('form').trigger('submit.prevent')

    expect(login).toHaveBeenCalledWith('demo@crm.com', 'demo1234')
  })
})
