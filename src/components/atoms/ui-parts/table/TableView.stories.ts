import { Meta, type StoryObj } from '@storybook/react';
import { TableView } from '@/components/atoms/ui-parts/table/TableView';

const meta = {
  title: 'OpendataBridge/Molecules/TableView',
  component: TableView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof TableView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultData: [
      {
        id: '1',
        name: 'name-1',
        creator: 'creator-1',
        createdAt: '2021-01-01',
        description: 'description-1',
      },
      {
        id: '2',
        name: 'name-2',
        creator: 'creator-2',
        createdAt: '2021-01-01',
        description: 'description-2',
      },
    ],
  },
};
