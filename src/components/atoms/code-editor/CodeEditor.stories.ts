import CodeEditor from '@/components/atoms/code-editor/CodeEditor';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/atoms/button/Button';

const meta = {
  title: 'OpendataBridge/atoms/CodeEditor',
  component: CodeEditor,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof CodeEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialCode: 'import pandas as pd;',
  },
};
