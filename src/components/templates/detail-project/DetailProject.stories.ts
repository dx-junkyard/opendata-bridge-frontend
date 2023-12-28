import type { Meta, StoryObj } from '@storybook/react';
import { DetailProject } from '@/components/templates/detail-project/DetailProject';

const meta = {
  title: 'OpendataBridge/Templates/DetailProject',
  component: DetailProject,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DetailProject>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      id: 'test',
      title: 'test',
      description: 'test',
      tags: ['tag1', 'tag2', 'tag3'],
      thumbnails: ['/dummy.png', '/dummy.png'],
      resources: [],
    },
  },
};
