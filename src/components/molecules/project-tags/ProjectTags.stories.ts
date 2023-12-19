import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project-tags/ProjectTags';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'OpendataBridge/Molecules/ProjectTags',
  component: ProjectTags,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'center',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectTags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: ['tag1', 'tag2', 'tag3'],
  },
};
