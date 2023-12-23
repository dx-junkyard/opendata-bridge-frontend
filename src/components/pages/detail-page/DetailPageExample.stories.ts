import type { Meta, StoryObj } from '@storybook/react';

import { DetailPageExample } from './DetailPageExample';

const meta = {
  title: 'OpendataBridge/Pages/DetailPageExample',
  component: DetailPageExample,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DetailPageExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
