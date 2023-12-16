import type { Meta, StoryObj } from '@storybook/react';
import { SearchFilter } from '@/components/atoms/search/filter/SearchFilter';

const meta = {
  title: 'OpendataBridge/Atoms/Search/Filter',
  component: SearchFilter,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'center',
  },
} satisfies Meta<typeof SearchFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    label: 'selected',
    isSelected: true,
  },
};

export const NotSelected: Story = {
  args: {
    label: 'notSelected',
    isSelected: false,
  },
};
