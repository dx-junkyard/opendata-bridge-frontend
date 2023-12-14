import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '@/components/atoms/search/input/SearchInput';

const meta = {
  title: 'OpendataBridge/Atoms/Search/Input',
  component: SearchInput,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    query: '',
    updateQuery: () => {},
  },
};

export const Query: Story = {
  args: {
    query: 'test',
    updateQuery: () => {},
  },
};
