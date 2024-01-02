import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from '@/components/atoms/action-card/ActionCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'OpendataBridge/Molecules/ActionCard',
  component: ActionCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'center',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ActionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UseRecipeCard: Story = {
  args: {
    title: 'データ整形レシピを実行する',
    description: '作成済みのデータ整形レシピを使って、データ整形を実行します',
    url: '',
    thumbnails: '/dummy1_1.png',
    buttonLabel: 'レシピを実行する',
  },
};

export const DevelopRecipeCard: Story = {
  args: {
    title: 'データ整形レシピを開発する',
    description: 'AIを使ってデータ整形用のレシピを開発します',
    url: '',
    thumbnails: '/dummy1_1.png',
    buttonLabel: 'レシピを開発する',
  },
};
