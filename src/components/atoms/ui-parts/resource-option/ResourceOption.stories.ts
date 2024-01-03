import { Meta, type StoryObj } from '@storybook/react';
import { ResourceOption } from '@/components/atoms/ui-parts/resource-option/ResourceOption';

const meta = {
  title: 'OpendataBridge/Molecules/ResourceOption',
  component: ResourceOption,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResourceOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resource: {
      name: '変換対象データ',
      file: new File([], 'empty.txt'),
    },
    onDelete: () => {},
  },
};
