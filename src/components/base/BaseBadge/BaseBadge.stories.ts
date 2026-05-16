import type { Meta, StoryObj } from '@storybook/vue3'
import BaseBadge from './BaseBadge.vue'

const meta: Meta<typeof BaseBadge> = {
  title: 'Base/BaseBadge',
  component: BaseBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'neutral'],
    },
    dot: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BaseBadge>

export const AllVariants: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <BaseBadge variant="success" dot>Activo</BaseBadge>
        <BaseBadge variant="warning" dot>Pendiente</BaseBadge>
        <BaseBadge variant="danger" dot>Error</BaseBadge>
        <BaseBadge variant="info" dot>Info</BaseBadge>
        <BaseBadge variant="neutral" dot>Inactivo</BaseBadge>
      </div>
    `,
  }),
}
