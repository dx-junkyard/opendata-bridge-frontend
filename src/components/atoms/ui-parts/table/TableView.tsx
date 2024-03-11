import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import React, { memo, useState } from 'react';
import { flexRender, useReactTable } from '@tanstack/react-table';
import classes from './TableView.module.scss';
import { GenericDataType } from '@/types/csv-file';

interface TableViewProps {
  defaultData: GenericDataType[];
}

const TableView = memo(({ defaultData }: TableViewProps) => {
  const columnHelper = createColumnHelper<GenericDataType>();

  const defaultDataWithNumbering = defaultData.map((data, index) => {
    return {
      No: index + 1,
      ...data,
    };
  });

  // キーに基づいて列を動的に生成する
  const columns = Object.keys(defaultDataWithNumbering[0]).map((key) =>
    columnHelper.accessor(key, {
      header: key || 'Unnamed',
      cell: (info) => info.getValue(),
    })
  );

  const [data, setData] = useState(() => [...defaultDataWithNumbering]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  table.getRowModel().rows.map((row) =>
    row.getVisibleCells().map((cell) => {
      console.info(
        cell.column.columnDef.header,
        cell.column.columnDef.cell,
        cell.column.columnDef.id
      );
    })
  );

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
});
TableView.displayName = 'TableView';

export default TableView;
