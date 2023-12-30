import type { Meta, StoryObj } from '@storybook/react';

import { SearchProject } from './SearchProject';

const meta = {
  title: 'OpendataBridge/Templates/SearchProject',
  component: SearchProject,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchProject>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: '',
    projectList: [],
    tags: new Map([[{ id: '1', title: 'test' }, true]]),
    isTyping: false,
    isLoading: true,
  },
};
