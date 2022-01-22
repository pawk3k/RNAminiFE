import { Column, TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';
import getColorFromThresholds from '../utils/getColor';

type ClashScoreTableData = {
  key: string;
  numbadbounds: string;
  numbadangles: string;
  numbounds: string;
  pct_badangels: string;
  clashscore: string;
  pct_badbounds: string;
  numangels: string;
  numsuites: string;
  allErrors: number;
};
const Table = dynamic<TableProps<ClashScoreTableData>>(
  () => import('@components/uiKit/Table/index'),
);
const ClashScoreTable: FunctionComponent<{ data: ClashScoreTableData[] }> = ({ data }) => {
  const columns = useMemo<Column<ClashScoreTableData>[]>(
    () => [
      {
        Header: 'RNA 3D structure',
        accessor: 'key',
      },
      {
        Header: 'Clash score',
        accessor: 'clashscore',
      },
      {
        Header: '#All bounds',
        accessor: 'numbounds',
      },
      {
        Header: '#Bad bounds',
        accessor: 'numbadbounds',
      },
      {
        Header: 'Bad bounds [%]',
        accessor: 'pct_badbounds',
        Cell: ({ value }): JSX.Element => (
          <div className={getColorFromThresholds([0.1, 0.2], Number(value))}>{value}</div>
        ),
      },
      {
        Header: '#All angels',
        accessor: 'numangels',
      },
      {
        Header: '#Bad angels [%]',
        accessor: 'pct_badangels',
        Cell: ({ value }): JSX.Element => (
          <div className={getColorFromThresholds([0.1, 0.5], Number(value))}>{value}</div>
        ),
      },
      {
        Header: '#All errors [%]',
        accessor: 'allErrors',
      },
    ],
    [],
  );
  return <Table columns={columns} data={data} />;
};
export default ClashScoreTable;
