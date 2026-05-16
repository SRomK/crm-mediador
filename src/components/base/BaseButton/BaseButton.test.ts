import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content and emits click events', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Guardar',
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.text()).toContain('Guardar')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('disables the button while loading', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.base-btn__spinner').exists()).toBe(true)
  })
})
