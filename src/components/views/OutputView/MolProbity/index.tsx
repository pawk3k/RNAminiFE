import { FunctionComponent } from 'react';
import ClashScoreTable from './ClashScoreTable';
import ErrorsTable from './ErrosTable';
import SwapsTable from './SwapsTable';

type MolProbity = {
  chiralSwaps: string;
  clashscore: string;
  numPperpOutliers: string;
  numSuiteOutliers: string;
  numSuites: string;
  numangles: string;
  numbadangles: string;
  numbadbonds: string;
  numbonds: string;
  pct_badangles: string;
  pct_badbonds: string;
  tetraOutliers: string;
};

const MolProbityTable: FunctionComponent<{ molprobity: string | undefined }> = ({ molprobity }) => {
  const resultOne: MolProbity[] = Object.values(
    JSON.parse(Buffer.from(String(molprobity!), 'base64').toString('ascii')),
  );

  const clashScoreData = resultOne.map(({ numSuiteOutliers, tetraOutliers, ...item }, index) => ({
    ...item,
    allErrors: Number(item.numbadbonds) + Number(item.numbadangles),
    key: index === 0 ? 'Input' : 'Solution',
  }));

  const swapsData = resultOne.map(
    ({ tetraOutliers, numSuites, numSuiteOutliers, chiralSwaps, numPperpOutliers }, index) => ({
      numPperpOutliers,
      tetraOutliers,
      chiralSwaps,
      numSuites,
      numSuiteOutliers,
      ptc_chiralSwaps: '3',

      pct_numSuiteOutliers: Number(
        ((Number(numSuiteOutliers) / Number(numSuites)) * 100).toFixed(2),
      ),
      allErrors:
        Number(numSuiteOutliers) +
        Number(chiralSwaps) +
        Number(tetraOutliers) +
        Number(numPperpOutliers),

      key: index === 0 ? 'Input' : 'Solution',
    }),
  );
  const errorsData = resultOne.map((item, index) => ({
    allErrors:
      Number(item.numSuiteOutliers) +
      Number(item.chiralSwaps) +
      Number(item.tetraOutliers) +
      Number(item.numPperpOutliers) +
      Number(item.numbadbonds) +
      Number(item.numbadangles),
    key: index === 0 ? 'Input' : 'Solution',
  }));

  return (
    <>
      <ClashScoreTable data={clashScoreData} />
      <SwapsTable data={swapsData} />
      <ErrorsTable
        data={errorsData}
        inputErrorsNum={
          errorsData.reduce((prev, curr) => (curr.allErrors < prev.allErrors ? curr : prev))
            .allErrors
        }
      />
    </>
  );
};

export default MolProbityTable;
