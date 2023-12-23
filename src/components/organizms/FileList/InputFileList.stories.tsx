import { InputFileList } from '@/components/organizms/FileList/InputFileList';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'OpendataBridge/Organizms/InputFileList',
  component: InputFileList,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InputFileList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileList: [
      new File([''], '変換対象データA.csv', { type: 'text/csv' }),
      new File([''], '変換対象データB.csv', { type: 'text/csv' }),
    ],
  },
};
