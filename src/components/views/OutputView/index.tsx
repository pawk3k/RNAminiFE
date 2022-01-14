import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/dist/client/router';
import useGetStatus from '../../../hooks/queries/useGetStatus/index';
import { useFileContext } from '../../../contextProviders/FileContextProvider/index';
import Loader from './Loader';
import DownloadTaskButton from './DownloadTaskButton';

const Molstar = dynamic(() => import('./Molstar'), {
  ssr: false,
});

const OutputView: FunctionComponent = () => {
  const { query } = useRouter();
  const [file] = useFileContext();
  console.log(file);
  const { data: { status } = {}, isError } = useGetStatus();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLoading = status === 'queued';
  // const isErrorOrLoading = isError || isLoading;

  // const handleDownloadFile = () => {
  //   // download and decode from base64
  //   const a = document.createElement('a');
  //   a.href = `data:text/plain;base64,${data}`;
  //   a.download = 'input.pdb';
  //   a.click();
  // };

  return false ? (
    <div className="my-auto w-full h-full flex justify-center items-center text-dashas-purple">
      <div className="pl-9 relative bg-dashas-pink rounded-3xl w-2/3 h-60 flex justify-start items-start flex-col">
        <div className="mt-11">Task : {query.uid}</div>
        <div>Submission time: time</div>
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
        <DownloadTaskButton />
        {/* <button
          type="button"
          onClick={handleDownloadFile}
          className="text-dashas-pink absolute bottom-5 ml-4 bg-dashas-purple px-9 rounded-full py-2 "
        >
          Download task
        </button> */}
      </div>
    </div>
  ) : (
    <div className="flex w-full justify-around">
      <div className="w-2/3 my-auto h-full flex justify-center items-center text-dashas-purple">
        <div className="w-full mx-9 px-7 relative bg-dashas-pink rounded-3xl h-60 flex justify-start items-start flex-col">
          <div className="mt-11">Task : {query.uid}</div>
          <div>Submission time: time</div>
          <div className="flex justify-center w-full items-center mt-3 text-3xl ">
            Your solution is ready!
          </div>
          <DownloadTaskButton />
        </div>
      </div>
      <Molstar />
    </div>
  );
};

export default OutputView;
