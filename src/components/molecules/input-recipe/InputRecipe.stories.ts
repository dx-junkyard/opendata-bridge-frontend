import InputRecipe from '@/components/molecules/input-recipe/InputRecipe';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'OpendataBridge/Molecules/InputRecipe',
  component: InputRecipe,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputRecipe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    recipe: {
      script: 'import pandas as pd',
      prompt: 'プロンプト例',
    },
  },
};
