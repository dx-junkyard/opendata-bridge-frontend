import type { Meta, StoryObj } from '@storybook/react';
import { SearchWindow } from '@/components/organizms/search-window/SearchWindow';

const meta = {
  title: 'OpendataBridge/Molecules/SearchWindow',
  component: SearchWindow,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchWindow>;

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
