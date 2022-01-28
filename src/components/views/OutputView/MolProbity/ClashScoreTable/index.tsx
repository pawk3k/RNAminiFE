import { Column, TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';
import getColorFromThresholds from '../utils/getColor';

// numbadbounds, pct_badangels, pct_badbounds, numangels, numsuites
type ClashScoreTableData = {
  key: string;
  numbadbonds: string;
  numbadangles: string;
  numbonds: string;
  pct_badangles: string;
  clashscore: string;
  pct_badbonds: string;
  numangles: string;
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
        Header: '#All bonds',
        accessor: 'numbonds',
      },
      {
        Header: '#Bad bonds',
        accessor: 'numbadbonds',
      },
      {
        Header: 'Bad bonds [%]',
        accessor: 'pct_badbonds',
        Cell: ({ value }): JSX.Element => (
          <div className={getColorFromThresholds([0.1, 0.2], Number(value))}>{value}</div>
        ),
      },
      {
        Header: '#All angles',
        accessor: 'numangles',
      },
      {
        Header: '#Bad angles',
        accessor: 'numbadangles',
      },
      {
        Header: 'Bad angles [%]',
        accessor: 'pct_badangles',
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
