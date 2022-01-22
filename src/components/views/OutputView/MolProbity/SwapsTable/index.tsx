import { Column, TableProps } from '@components/uiKit/Table/Table.types';
import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';

type SwapsTableData = {
  key: string;
  allErrors: number;
  numPrepOutliers: string;
  tetraOutliers: string;
  chiralSwaps: string;
  ptc_chiralSwaps: string;
  numsuites: string;
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
        Header: 'Chiral handedness swaps[%]',
        accessor: 'ptc_chiralSwaps',
      },
      {
        Header: '#Tetrahedral geometry outliers',
        accessor: 'tetraOutliers',
      },
      {
        Header: '#All residues',
        accessor: 'numsuites',
      },
      {
        Header: '#Probably wrong sugar puckers:',
        // TODO: fix
      },
      {
        Header: '#Probably wrong sugar puckers:[%]',
        // TODO: fix
      },
      {
        Header: '#Bad backbone conformations',
        accessor: 'numSuiteOutliers',
      },
      {
        Header: '#Bad backbone conformations',
        accessor: 'numSuiteOutliers',
      },
      {
        Header: 'Bad backbone conformations[%]',
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
