import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from './BaseInput.vue'

describe('BaseInput', () => {
  it('emits update:modelValue when the user types', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'email',
        label: 'Email',
        modelValue: '',
      },
    })

    await wrapper.find('input').setValue('demo@crm.com')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['demo@crm.com'])
  })

  it('links validation errors to the input for accessibility', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'password',
        label: 'Password',
        error: 'Password is required',
      },
    })

    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('password-error')
    expect(wrapper.find('[role="alert"]').text()).toBe('Password is required')
  })
})
