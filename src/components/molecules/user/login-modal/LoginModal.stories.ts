import { Meta, type StoryObj } from '@storybook/react';
import { LoginModal } from '@/components/molecules/user/login-modal/LoginModal';

const meta = {
  title: 'OpendataBridge/Molecules/LoginModal',
  component: LoginModal,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
