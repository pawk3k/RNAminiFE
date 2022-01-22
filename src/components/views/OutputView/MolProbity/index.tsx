import { FunctionComponent } from 'react';
import ClashScoreTable from './ClashScoreTable';
import ErrorsTable from './ErrosTable';
import SwapsTable from './SwapsTable';

const MolProbityTable: FunctionComponent = () => {
  const resultOne = [
    {
      // check this
      chiralSwaps: '1',
      numPrepOutliers: '1',
      numSuiteOutliers: '4',
      numbadbounds: '1',
      numbadangles: '0',
      numbounds: '669',
      pct_badangels: '0.00',
      clashscore: '8,84',
      pct_badbounds: '0.00',
      numangels: '1042',
      numsuites: '28',
      tetraOutliers: '0',
    },
    {
      chiralSwaps: '1',
      numPrepOutliers: '1',
      numSuiteOutliers: '4',
      numbadbounds: '0',
      numbadangles: '0',
      numbounds: '669',
      pct_badangels: '0.00',
      clashscore: '8,84',
      pct_badbounds: '0.00',
      numangels: '1042',
      numsuites: '28',
      tetraOutliers: '0',
    },
  ];
  const clashScoreData = resultOne.map(({ numSuiteOutliers, tetraOutliers, ...item }, index) => ({
    ...item,
    allErrors: Number(item.numbadbounds) + Number(item.numbadangles),
    key: index === 0 ? 'Input' : 'Solution',
  }));

  const swapsData = resultOne.map(
    ({ tetraOutliers, numsuites, numSuiteOutliers, chiralSwaps, numPrepOutliers }, index) => ({
      numPrepOutliers,
      tetraOutliers,
      chiralSwaps,
      numsuites,
      numSuiteOutliers,
      ptc_chiralSwaps: '3',
      pct_numSuiteOutliers: Number(
        ((Number(numSuiteOutliers) / Number(numsuites)) * 100).toFixed(2),
      ),
      allErrors:
        Number(numSuiteOutliers) +
        Number(chiralSwaps) +
        Number(tetraOutliers) +
        Number(numPrepOutliers),

      key: index === 0 ? 'Input' : 'Solution',
    }),
  );
  const errorsData = resultOne.map((item, index) => ({
    allErrors:
      Number(item.numSuiteOutliers) +
      Number(item.chiralSwaps) +
      Number(item.tetraOutliers) +
      Number(item.numPrepOutliers) +
      Number(item.numbadbounds) +
      Number(item.numbadangles),
    key: index === 0 ? 'Input' : 'Solution',
  }));

  return (
    <>
      <ClashScoreTable data={clashScoreData} />
      <SwapsTable data={swapsData} />
      <ErrorsTable data={errorsData} />
    </>
  );
};

export default MolProbityTable;
