import { Column, TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';

type SwapsTableData = { key: string; numberOfErrors: number };
const Table = dynamic<TableProps<SwapsTableData>>(() => import('@components/uiKit/Table/index'));
const SwapsTable: FunctionComponent = () => {
  const errorTableData = [
    { key: 'Input', numberOfErrors: 32 },
    { key: 'Solution', numberOfErrors: 32 },
  ];
  const columns = useMemo<Column<SwapsTableData>[]>(
    () => [
      {
        Header: 'RNA 3D structure',
        accessor: 'key',
      },
      {
        Header: 'Total number of errors',
        accessor: 'numberOfErrors',
      },
    ],
    [],
  );
  return <Table columns={columns} data={errorTableData} />;
};
export default SwapsTable;
