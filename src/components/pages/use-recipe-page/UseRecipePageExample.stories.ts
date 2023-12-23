import type { Meta, StoryObj } from '@storybook/react';
import { UseRecipePageExample } from '@/components/pages/use-recipe-page/UseRecipePageExample';

const meta = {
  title: 'OpendataBridge/Pages/UseRecipePageExample',
  component: UseRecipePageExample,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UseRecipePageExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
