import { Column, TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';

type ErrorTableData = { key: string; numberOfErrors: number };

const Table = dynamic<TableProps<ErrorTableData>>(() => import('@components/uiKit/Table/index'));

const ErrorsTable: FunctionComponent = () => {
  const errorTableData = [
    { key: 'Input', numberOfErrors: 32 },
    { key: 'Solution', numberOfErrors: 32 },
  ];
  const columns = useMemo<Column<ErrorTableData>[]>(
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

export default ErrorsTable;
