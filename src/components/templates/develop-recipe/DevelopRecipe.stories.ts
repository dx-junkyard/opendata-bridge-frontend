import type { Meta, StoryObj } from '@storybook/react';
import { DevelopRecipe } from '@/components/templates/develop-recipe/DevelopRecipe';

const meta = {
  title: 'OpendataBridge/Templates/DevelopRecipe',
  component: DevelopRecipe,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DevelopRecipe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      id: 'test',
      name: 'test',
      description: 'test',
      tags: ['tag1', 'tag2', 'tag3'],
      thumbnails: ['/dummy.png', '/dummy.png'],
      recipe: '{"dummy": "dummy"}',
      resources: [],
    },
  },
};
