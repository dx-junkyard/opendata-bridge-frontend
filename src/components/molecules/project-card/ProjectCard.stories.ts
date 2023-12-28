import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'OpendataBridge/Molecules/ProjectCard',
  component: ProjectCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'center',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      id: '1',
      title: 'Project Card',
      description: 'This is a project card.',
      tags: ['tag1', 'tag2', 'tag3'],
      thumbnails: [],
      resources: [],
    },
  },
};
