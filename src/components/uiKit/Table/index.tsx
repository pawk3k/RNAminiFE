// eslint-disable-next-line import/prefer-default-export
import { useTable } from 'react-table';

import { TableProps } from './Table.types';

const Table = <T extends object = object>({ data, columns }: TableProps<T>): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
  });

  return (
    <div className="overflow-auto px-10 ">
      <table
        {...getTableProps()}
        className="m-2 p-2 table-fixed bg-dashas-pink rounded-md w-full relative "
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className=" border-2 border-black">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-2 border-black "
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
                className="bg-dashas-pink  even:bg-purple-300 text-center "
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
