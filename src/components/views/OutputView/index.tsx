import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/dist/client/router';
import useGetStatus from '../../../hooks/queries/useGetStatus/index';
// @ts-ignore
const Molstar = dynamic(() => import('molstar-react'), {
  ssr: false,
});

const OutputView: FunctionComponent = () => {
  const { query } = useRouter();

  const { data: { data, status } = {}, isError } = useGetStatus();
  const isLoading = status === 'queued';
  const isErrorOrLoading = isError || isLoading;

  const handleDownloadFile = () => {
    // download and decode from base64
    const a = document.createElement('a');
    a.href = `data:text/plain;base64,${data}`;
    a.download = 'input.pdb';
    a.click();
  };

  return isErrorOrLoading ? (
    <div className="my-auto w-full h-full flex justify-center items-center text-dashas-purple">
      <div className="pl-9 relative bg-dashas-pink rounded-3xl w-2/3 h-60 flex justify-start items-start flex-col">
        <div className="mt-11">Task : {query.uid}</div>
        <div>Submission time: time</div>
        <div
          className={`self-center mt-2 text-2xl whitespace-pre-wrap text-center ${
            isError && 'text-dashas-red'
          }`}
        >
          <div className="inline-block mr-2 animate-spin h-5 w-5 border-2 border-t-dashas-purple rounded-3xl"></div>
          {isError
            ? 'An error occurred while processing your\n task. Please try again later.'
            : 'Processing file'}
        </div>
        <button
          type="button"
          onClick={handleDownloadFile}
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
