import { Alert } from '@/components/atoms/ui-parts/alert/Alert';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'OpendataBridge/Atoms/Alert',
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Info: Story = {
  args: {
    title: 'プロンプト実行が成功しました',
    type: 'info',
  },
};

export const Error: Story = {
  args: {
    title: 'プロンプト実行が失敗しました',
    message: 'プロンプト実行時にエラーが発生したため、処理を中断しました。',
    type: 'error',
  },
};
