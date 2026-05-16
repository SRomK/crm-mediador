import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCard from './BaseCard.vue'
import BaseButton from '../BaseButton/BaseButton.vue'

const meta: Meta<typeof BaseCard> = {
  title: 'Base/BaseCard',
  component: BaseCard,
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    shadow: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BaseCard>

export const WithTitle: Story = {
  args: { title: 'Información del cliente' },
  render: (args) => ({
    components: { BaseCard },
    setup: () => ({ args }),
    template: `
      <BaseCard v-bind="args" style="width:400px">
        <p style="font-size:14px;color:#64748b">Contenido de la tarjeta con información relevante.</p>
      </BaseCard>
    `,
  }),
}

export const WithFooter: Story = {
  args: { title: 'Confirmación' },
  render: (args) => ({
    components: { BaseCard, BaseButton },
    setup: () => ({ args }),
    template: `
      <BaseCard v-bind="args" style="width:400px">
        <p style="font-size:14px;color:#64748b">¿Deseas eliminar este cliente?</p>
        <template #footer>
          <BaseButton variant="outline" size="sm">Cancelar</BaseButton>
          <BaseButton variant="danger" size="sm">Eliminar</BaseButton>
        </template>
      </BaseCard>
    `,
  }),
}
