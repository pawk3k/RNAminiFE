/* eslint-disable complexity */
import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/dist/client/router';
import useGetStatus from '../../../hooks/queries/useGetStatus/index';
import Loader from './Loader';
import DownloadFileButton from './DownloadTaskButton';
import MainStatus from './MainStatus';

const Molstar = dynamic(() => import('./Molstar'), {
  ssr: false,
});

const OutputView: FunctionComponent = () => {
  const { query } = useRouter();
  const {
    data: { status = 'finished', data, logs, solution, supercomposition, filteredpdb } = {},
    isError,
  } = useGetStatus();

  if (status === 'error' || isError) {
    return (
      <div className="my-28 w-full h-full flex justify-center items-center text-dashas-purple">
        <div className="pl-9 relative bg-dashas-pink rounded-3xl w-2/3 h-60 flex justify-around items-start flex-col">
          <div className="mt-11">Task : {query.uid}</div>
          <div
            className={`self-center mt-2 text-2xl whitespace-pre-wrap text-center ${'text-dashas-red'}`}
          >
            An error occurred while processing your task. Please try again later.
          </div>
          <div className="flex w-full self-end ">
            <DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download task" />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div>
        <MainStatus
          mainText={
            <div className="flex justify-center w-full items-center mt-3 text-3xl ">
              Your solution is ready!
            </div>
          }
          buttons={
            <>
              <DownloadFileButton
                fileName="solution.pdb"
                file={solution ?? ''}
                text="Download solution"
              />

              <DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download task" />
              <DownloadFileButton fileName="logs.txt" file={logs ?? ''} text="Download Logs" />
            </>
          }
        />
        <Molstar inputFile1={supercomposition ?? ''} inputFile2={filteredpdb ?? ''} />
      </div>
    );
  }

  return (
    <MainStatus
      mainText={
        <div className="self-center mt-2 text-2xl whitespace-pre-wrap text-center">
          <Loader />
          Processing your file
        </div>
      }
      buttons={<DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download task" />}
    />
    // <div className="my-auto w-full h-full flex justify-center items-center text-dashas-purple">
    //   <div className="pl-9 relative bg-dashas-pink rounded-3xl w-2/3 h-60 flex justify-around items-start flex-col">
    //     <div className="mt-11">Task : {query.uid}</div>
    //     <div className="self-center mt-2 text-2xl whitespace-pre-wrap text-center">
    //       <Loader />
    //       Processing your file
    //     </div>
    //     <div className="flex w-full self-end, ">
    //       <DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download task" />
    //     </div>
    //   </div>
    // </div>
  );
};

export default OutputView;
