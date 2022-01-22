import { FunctionComponent } from 'react';
import ClashScoreTable from './ClashScoreTable';
import ErrorsTable from './ErrosTable';

const MolProbityTable: FunctionComponent = () => {
  //   const tableData = useMemo(() => mockData, []);
  //   const keys = Object.keys(tableData.input);
  //   const outputEntries = Object.entries(mockData.output);
  //   const result = Object.entries(mockData.input).map((inputElement, index) => ({
  //     key: keys[index],
  //     input: inputElement[1],
  //     output: outputEntries[index][1],
  //   }));
  const resultOne = [
    {
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

  return (
    <div className="mx-auto flex justify-center">
      <ClashScoreTable data={clashScoreData} />
      {/* <Table columns={columns} data={result} /> */}
      <ErrorsTable />
    </div>
  );
};

export default MolProbityTable;
