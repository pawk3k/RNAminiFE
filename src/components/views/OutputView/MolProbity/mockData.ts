const mockData = {
  input: {
    clashscore: '20',
    'numbadbonds:numbonds:pct_badbonds': '20',
    'numbadangles:numangles:pct_badangles': '20',
    'chiralSwaps:pct_chiralSwaps': '20',
    tetraOutliers: '20',
    'numSuiteOutliers:numSuites:pct_numSuiteOutliers': '20',
  },
  output: {
    clashscore: '20',
    'numbadbonds:numbonds:pct_badbonds': '20',
    'numbadangles:numangles:pct_badangles': '20',
    'chiralSwaps:pct_chiralSwaps': '20',
    tetraOutliers: '20',
    'numSuiteOutliers:numSuites:pct_numSuiteOutliers': '20',
  },
};
export interface Input {
  clashscore: string;
  'numbadbonds:numbonds:pct_badbonds:': string;
  'numbadangles:numangles:pct_badangles': string;
  'chiralSwaps:pct_chiralSwaps': string;
  tetraOutliers: string;
  'numSuiteOutliers:numSuites:pct_numSuiteOutliers': string;
}

export interface RootObject {
  input: Input;
  output: Input;
}

export default mockData;
