import { Meta, type StoryObj } from '@storybook/react';
import SelectIndex from '@/components/molecules/select-index/SelectIndex';

const meta = {
  title: 'OpendataBridge/molecules/SelectIndex',
  component: SelectIndex,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectIndex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCount: 10,
    currentIndex: 1,
  },
};
