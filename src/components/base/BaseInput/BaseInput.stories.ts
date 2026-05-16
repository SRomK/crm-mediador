import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'

const meta: Meta<typeof BaseInput> = {
  title: 'Base/BaseInput',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BaseInput>

export const Default: Story = {
  args: { label: 'Nombre', placeholder: 'Introduce tu nombre' },
  render: (args) => ({
    components: { BaseInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<BaseInput v-bind="args" v-model="value" style="width:320px" />`,
  }),
}

export const WithError: Story = {
  args: { label: 'Email', error: 'El email no es válido', modelValue: 'not-an-email' },
  render: (args) => ({
    components: { BaseInput },
    setup: () => ({ args }),
    template: `<BaseInput v-bind="args" style="width:320px" />`,
  }),
}

export const WithHint: Story = {
  args: { label: 'Contraseña', type: 'password', hint: 'Mínimo 8 caracteres' },
  render: (args) => ({
    components: { BaseInput },
    setup: () => ({ args }),
    template: `<BaseInput v-bind="args" style="width:320px" />`,
  }),
}
