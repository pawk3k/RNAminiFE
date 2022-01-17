import { TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';
import { Column } from 'react-table';
import mockData from './mockData';

type TableData = { input: number; output: number; rowName: string };

const Table = dynamic<TableProps<TableData>>(() => import('@components/uiKit/Table/index'));

const MolProbityTable: FunctionComponent = () => {
  const tableData = useMemo(() => mockData, []);

  const columns = useMemo<Column<TableData>[]>(
    () => [
      {
        Header: 'Row name',
        accessor: 'rowName',
      },
      {
        Header: 'Input',
        accessor: 'input',
      },
      {
        Header: 'Output',
        accessor: 'output',
      },
    ],
    [],
  );

  return (
    <div className="mx-auto flex justify-center">
      <Table columns={columns} data={tableData} />
    </div>
  );
};

export default MolProbityTable;
