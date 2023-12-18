import type { Meta, StoryObj } from '@storybook/react';

import { DetailPage } from './DetailPage';

const meta = {
  title: 'OpendataBridge/Pages/DetailPage',
  component: DetailPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
