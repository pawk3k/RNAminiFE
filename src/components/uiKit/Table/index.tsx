// import { useTable } from 'react-table';

// import { TableProps } from './Table.types';

// const Table = <T extends object = object>({ data, columns }: TableProps<T>): JSX.Element => {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
//     columns,
//     data,
//   });

//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => (
//                 <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//               ))}
//             </tr>
//           );
//         })}
//         <tr>
//           <td className="w-full text-center" colSpan={columns.length} />
//         </tr>
//       </tbody>
//     </table>
//   );
// };
// export default Table;
