import { SuccessFormattingModal } from '@/components/molecules/modal/success-formating-modal/SuccessFormattingModal';
import { Meta, type StoryObj } from '@storybook/react';

const meta = {
  title: 'OpendataBridge/Molecules/SuccessFormattingModal',
  component: SuccessFormattingModal,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessFormattingModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
