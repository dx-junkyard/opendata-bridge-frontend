import type { Meta, StoryObj } from '@storybook/react';
import { UseRecipePage } from '@/components/pages/use-recipe-page/UseRecipePage';

const meta = {
  title: 'OpendataBridge/Pages/UseRecipePage',
  component: UseRecipePage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UseRecipePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
