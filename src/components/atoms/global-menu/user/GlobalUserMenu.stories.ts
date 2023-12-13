import type { Meta, StoryObj } from '@storybook/react';
import { GlobalUserMenu } from './GlobalUserMenu';

const meta = {
  title: 'OpendataBridge/atoms/GlobalMenu/User',
  component: GlobalUserMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof GlobalUserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'dx-junkyard',
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: undefined,
  },
};
