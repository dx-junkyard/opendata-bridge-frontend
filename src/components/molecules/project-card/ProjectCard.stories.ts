import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@/components/molecules/hero/Hero';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { Project } from '@/types/project';

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
      name: 'Project Card',
      description: 'This is a project card.',
      url: '',
      thumbnails: [],
    },
  },
};
