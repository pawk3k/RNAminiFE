import { Column, TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';

type SwapsTableData = {
  key: string;
  chiralSwaps: string;
  allErrors: number;
  numPperpOutliers: string;
  tetraOutliers: string;
  numSuites: string;
  numSuiteOutliers: string;
  pct_numSuiteOutliers: number;
};
const Table = dynamic<TableProps<SwapsTableData>>(() => import('@components/uiKit/Table/index'));
const SwapsTable: FunctionComponent<{ data: SwapsTableData[] }> = ({ data }) => {
  const columns = useMemo<Column<SwapsTableData>[]>(
    () => [
      {
        Header: 'RNA 3D structure',
        accessor: 'key',
      },
      {
        Header: '#Chiral handedness swaps',
        accessor: 'chiralSwaps',
      },

      {
        Header: '#Tetrahedral geometry outliers',
        accessor: 'tetraOutliers',
      },
      {
        Header: '#All residues',
        accessor: 'numSuites',
      },
      {
        Header: '#Probably wrong sugar puckers:',
        accessor: 'numPperpOutliers',
      },
      {
        Header: '#Bad backbone conformations',
        accessor: 'numSuiteOutliers',
      },
      {
        Header: 'Bad backbone conformations [%]',
        accessor: 'pct_numSuiteOutliers',
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
export default SwapsTable;
