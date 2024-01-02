import SearchFilterList from '@/components/molecules/search-filter-list/SearchFilterList';
import { Meta, type StoryObj } from '@storybook/react';

const meta = {
  title: 'OpendataBridge/molecules/SearchFilterList',
  component: SearchFilterList,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchFilterList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: new Map([
      [{ id: '1', title: 'test' }, true],
      [{ id: '2', title: 'test2' }, false],
      [{ id: '3', title: 'test3' }, true],
      [{ id: '4', title: 'test4' }, false],
      [{ id: '5', title: 'test5' }, true],
      [{ id: '6', title: 'test6' }, false],
      [{ id: '7', title: 'test7' }, true],
      [{ id: '8', title: 'test8' }, false],
      [{ id: '9', title: 'test9' }, true],
      [{ id: '10', title: 'test10' }, false],
    ]),
  },
};
