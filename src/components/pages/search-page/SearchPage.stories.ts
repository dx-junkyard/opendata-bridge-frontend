import type { Meta, StoryObj } from '@storybook/react';

import { SearchPage } from './SearchPage';

const meta = {
  title: 'OpendataBridge/Pages/SearchPage',
  component: SearchPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
