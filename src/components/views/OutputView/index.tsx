/* eslint-disable complexity */
import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/dist/client/router';
import useGetStatus from '../../../hooks/queries/useGetStatus/index';
import Loader from './Loader';
import DownloadTaskButton from './DownloadTaskButton';

const Molstar = dynamic(() => import('./Molstar'), {
  ssr: false,
});

const OutputView: FunctionComponent = () => {
  const { query } = useRouter();
  const { data: { status, data, logs, solution, supercomposition, filteredpdb } = {}, isError } =
    useGetStatus();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLoading = status === 'queued';

  if (status === 'error' || isError) {
    return (
      <div className="my-auto w-full h-full flex justify-center items-center text-dashas-purple">
        <div className="pl-9 relative bg-dashas-pink rounded-3xl w-2/3 h-60 flex justify-around items-start flex-col">
          <div className="mt-11">Task : {query.uid}</div>
          <div
            className={`self-center mt-2 text-2xl whitespace-pre-wrap text-center ${'text-dashas-red'}`}
          >
            An error occurred while processing your task. Please try again later.
          </div>
          <div className="flex w-full self-end, ">
            <DownloadTaskButton file={data ?? ''} text="Download task" />
          </div>
        </div>
      </div>
    );
  }

  if (status==="finished") {
    return (
      <div className="flex w-full justify-around">
        <div className="w-2/3 my-auto h-full flex justify-around items-center text-dashas-purple">
          <div className="w-full mx-9 px-7 relative bg-dashas-pink rounded-3xl h-60 flex justify-around items-start flex-col">
            <div className="mt-11">Task : {query.uid}</div>
            <div className="flex justify-center w-full items-center mt-3 text-3xl ">
              Your solution is ready!
            </div>
            <div className="flex w-full justify-center self-end">
              <DownloadTaskButton file={data ?? ''} text="Download task" />
              <DownloadTaskButton file={logs ?? ''} text="Logs" />
              <DownloadTaskButton file={solution ?? ''} text="Download solution" />
            </div>
          </div>
        </div>
        <Molstar inputFile1={supercomposition ?? ''} inputFile2={filteredpdb ?? ''} />
      </div>
    );
  }

  return (
    <div className="my-auto w-full h-full flex justify-center items-center text-dashas-purple">
      <div className="pl-9 relative bg-dashas-pink rounded-3xl w-2/3 h-60 flex justify-around items-start flex-col">
        <div className="mt-11">Task : {query.uid}</div>
        <div
          className={`self-center mt-2 text-2xl whitespace-pre-wrap text-center ${
            isError && 'text-dashas-red'
          }`}
        >
          <Loader />
          {isError
            ? 'An error occurred while processing your\n task. Please try again later.'
            : 'Processing file'}
        </div>
        <div className="flex w-full self-end, ">
          <DownloadTaskButton file={data ?? ''} text="Download task" />
        </div>
      </div>
    </div>
  );
};

export default OutputView;
