import type { Meta, StoryObj } from '@storybook/react';
import { DevelopRecipePageExample } from '@/components/pages/develop-recipe-page/DevelopRecipePageExample';

const meta = {
  title: 'OpendataBridge/Pages/DevelopRecipePageExample',
  component: DevelopRecipePageExample,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DevelopRecipePageExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
