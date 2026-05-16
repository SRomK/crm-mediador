import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from './BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  title: 'Base/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BaseButton>

export const Primary: Story = {
  args: { variant: 'primary', size: 'md' },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: `<BaseButton v-bind="args">Guardar</BaseButton>`,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="outline">Outline</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
        <BaseButton variant="danger">Danger</BaseButton>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <BaseButton size="sm">Small</BaseButton>
        <BaseButton size="md">Medium</BaseButton>
        <BaseButton size="lg">Large</BaseButton>
      </div>
    `,
  }),
}

export const Loading: Story = {
  args: { loading: true, variant: 'primary' },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: `<BaseButton v-bind="args">Cargando...</BaseButton>`,
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: `<BaseButton v-bind="args">Deshabilitado</BaseButton>`,
  }),
}
