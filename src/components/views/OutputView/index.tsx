/* eslint-disable complexity */
import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import useGetStatus from '../../../hooks/queries/useGetStatus/index';
import Loader from './Loader';
import DownloadFileButton from './DownloadTaskButton';
import MainStatus from './MainStatus';
import MolProbityTable from './MolProbity';
// import MolProbityTable from './MolProbity';

const Molstar = dynamic(() => import('./Molstar'), {
  ssr: false,
  loading: () => <Loader />,
});

const OutputView: FunctionComponent = () => {
  const { data: { status, data, logs, solution, supercomposition, filteredpdb } = {}, isError } =
    useGetStatus();

  if (status === 'error' || isError) {
    return (
      <MainStatus
        mainText={
          <div
            className={`self-center mt-2 text-2xl whitespace-pre-wrap text-center ${'text-dashas-red'}`}
          >
            An error occurred while processing your task.
            <br />
            Please try again later.
          </div>
        }
        buttons={
          <DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download input" />
        }
      />
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
              <DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download input" />
              <DownloadFileButton fileName="logs.txt" file={logs ?? ''} text="Download logs" />
            </>
          }
        />
        <div className="flex">
          <Molstar inputFile1={supercomposition ?? ''} inputFile2={filteredpdb ?? ''} />
        </div>
        <MolProbityTable />
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
      buttons={<DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download input" />}
    />
  );
};

export default OutputView;
