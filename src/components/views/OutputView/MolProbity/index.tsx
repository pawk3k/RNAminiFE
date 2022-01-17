import { TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';
import { Column } from 'react-table';
import mockData from './mockData';

type TableData = { key: string; input: string; output: string };

const Table = dynamic<TableProps<TableData>>(() => import('@components/uiKit/Table/index'));

const MolProbityTable: FunctionComponent = () => {
  const tableData = useMemo(() => mockData, []);
  const keys = Object.keys(tableData.input);
  const outputEntries = Object.entries(mockData.output);
  const result = Object.entries(mockData.input).map((inputElement, index) => ({
    key: keys[index],
    input: inputElement[1],
    output: outputEntries[index][1],
  }));

  const columns = useMemo<Column<TableData>[]>(
    () => [
      {
        Header: 'Row name',
        accessor: 'key',
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
      <Table columns={columns} data={result} />
    </div>
  );
};

export default MolProbityTable;
