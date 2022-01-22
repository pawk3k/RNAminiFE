// eslint-disable-next-line import/prefer-default-export
import { useTable } from 'react-table';

import { TableProps } from './Table.types';

const Table = <T extends object = object>({ data, columns }: TableProps<T>): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
  });

  return (
    <div className="p-2 rounded-xl backdrop-blur-sm bg-dashas-pink">
      <table {...getTableProps()} className="m-2 p-2">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="rounded-xl ">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-2">
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
              <tr {...row.getRowProps()} className="bg-dashas-pink even:bg-purple-300 rounded-xl">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td className="w-full text-center" colSpan={columns.length} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Table;
