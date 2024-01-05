import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { useState } from 'react';
import { flexRender, useReactTable } from '@tanstack/react-table';
import classes from './TableView.module.scss';
import { GenericDataType } from '@/types/csv-file';

interface TableViewProps {
  defaultData: GenericDataType[];
}

export const TableView = ({ defaultData }: TableViewProps) => {
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
      header: key,
      cell: (info) => info.getValue(),
    })
  );

  const [data, setData] = useState(() => [...defaultDataWithNumbering]);
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
