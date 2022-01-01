import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
// @ts-ignore
const Molstar = dynamic(() => import('molstar-react'), {
  ssr: false,
});

const OutputView: FunctionComponent = () => {
  const isError = false;
  const isLoading = true;
  const isErrorOrLoading = isError || isLoading;

  return isErrorOrLoading ? (
    <div className="relative my-auto w-full h-full flex justify-center items-center text-dashas-purple">
      <div className="pl-9 relative bg-dashas-pink rounded-3xl w-2/3 h-60 flex justify-start items-start flex-col">
        <div className="mt-11">Task : id</div>
        <div>Submission time: time</div>
        <div
          className={`self-center mt-2 text-2xl whitespace-pre-wrap text-center ${
            isError && 'text-dashas-red'
          }`}
        >
          {isError
            ? 'An error occurred while processing your\n task. Please try again later.'
            : 'Processing file'}
        </div>
        <button
          type="button"
          className="text-dashas-pink absolute bottom-5 ml-4 bg-dashas-purple px-9 rounded-full py-2 "
        >
          Download task
        </button>
      </div>
    </div>
  ) : (
    <div>
      <div className="ml-10 mt-40">
        <Molstar
          // pdbId="1a0a"
          // url="https://files.rcsb.org/download/1a0a.pdb"
          // @ts-ignore
          dimensions={[500, 500]}
          options={{
            layoutShowControls: false,
            'hide-controls': 1,
          }}
        />
      </div>
    </div>
  );
};

export default OutputView;
