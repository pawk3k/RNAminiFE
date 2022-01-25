// eslint-disable-next-line import/prefer-default-export
import { useTable } from 'react-table';

import { TableProps } from './Table.types';

const Table = <T extends object = object>({ data, columns }: TableProps<T>): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
  });

  return (
    <div className="overflow-auto px-2">
      <table
        {...getTableProps()}
        className="relative m-2 w-full table-fixed rounded-md bg-dashas-pink p-2 "
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-2 border-black">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-2 border-black text-center "
                  style={{ overflowWrap: 'break-word' }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="p-2">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-dashas-pink  text-center even:bg-purple-300 "
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border-2 border-black">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
