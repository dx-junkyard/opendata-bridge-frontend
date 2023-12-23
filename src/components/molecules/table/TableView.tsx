import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { useState } from 'react';
import { flexRender, useReactTable } from '@tanstack/react-table';
import classes from './TableView.module.scss';

export type GenericDataType = Record<string, any>;

const defaultData: GenericDataType[] = [
  {
    id: '1',
    name: 'name-1',
    creator: 'creator-1',
    createdAt: '2021-01-01',
    description: 'description-1',
  },
  {
    id: '2',
    name: 'name-2',
    creator: 'creator-2',
    createdAt: '2021-01-01',
    description: 'description-2',
  },
];

export const TableView = () => {
  const columnHelper = createColumnHelper<GenericDataType>();

  // キーに基づいて列を動的に生成する
  const columns = Object.keys(defaultData[0]).map((key) =>
    columnHelper.accessor(key, {
      header: key,
      cell: (info) => info.getValue(),
    })
  );

  const [data, setData] = useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white text-black">
      <table className={classes.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={classes.th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={classes.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
