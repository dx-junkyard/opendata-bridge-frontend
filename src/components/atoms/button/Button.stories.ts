import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'OpendataBridge/Atoms/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PrimaryLarge: Story = {
  args: {
    label: 'Button',
    color: 'primary',
    size: 'large',
  },
};

export const SecondaryLarge: Story = {
  args: {
    label: 'Button',
    color: 'secondary',
    size: 'large',
  },
};

export const PrimaryXL: Story = {
  args: {
    label: 'Button',
    color: 'primary',
    size: 'xl',
  },
};

export const SecondaryXL: Story = {
  args: {
    label: 'Button',
    color: 'secondary',
    size: 'xl',
  },
};
