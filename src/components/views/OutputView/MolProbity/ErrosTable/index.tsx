import { Column, TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';

type ErrorTableData = { key: string; allErrors: number };

const Table = dynamic<TableProps<ErrorTableData>>(() => import('@components/uiKit/Table/index'));

const ErrorsTable: FunctionComponent<{ data: ErrorTableData[] }> = ({ data }) => {
  const columns = useMemo<Column<ErrorTableData>[]>(
    () => [
      {
        Header: 'RNA 3D structure',
        accessor: 'key',
      },
      {
        Header: 'Total number of errors',
        accessor: 'allErrors',
      },
    ],
    [],
  );

  return <Table columns={columns} data={data} />;
};

export default ErrorsTable;
