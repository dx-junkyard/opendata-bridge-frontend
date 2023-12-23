import type { Meta, StoryObj } from '@storybook/react';

import { SearchPageExample } from './SearchPageExample';

const meta = {
  title: 'OpendataBridge/Pages/SearchPageExample',
  component: SearchPageExample,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchPageExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
