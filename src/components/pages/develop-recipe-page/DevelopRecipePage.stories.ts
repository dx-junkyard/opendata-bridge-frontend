import type { Meta, StoryObj } from '@storybook/react';
import { UseRecipePage } from '@/components/pages/use-recipe-page/UseRecipePage';
import { DevelopRecipePage } from '@/components/pages/develop-recipe-page/DevelopRecipePage';

const meta = {
  title: 'OpendataBridge/Pages/DevelopRecipePage',
  component: DevelopRecipePage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DevelopRecipePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
