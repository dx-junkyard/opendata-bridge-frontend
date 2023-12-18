import type { Meta, StoryObj } from '@storybook/react';
import { DatasetCard } from '@/components/molecules/dataset-card/DatasetCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'OpendataBridge/Molecules/DatasetCard',
  component: DatasetCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'center',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DatasetCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataset: {
      title: 'ファイル名',
      organization: '自治体名',
      url: '',
    },
  },
};
