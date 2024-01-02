import type { Meta, StoryObj } from '@storybook/react';
import LogoutMenu from '@/components/molecules/user/logout-menu/LogoutMenu';

const meta = {
  title: 'OpendataBridge/Molecules/LogoutMenu',
  component: LogoutMenu,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoutMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
