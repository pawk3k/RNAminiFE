/* eslint-disable complexity */
import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import useGetStatus from '../../../hooks/queries/useGetStatus/index';
import Loader from './Loader';
import DownloadFileButton from './DownloadTaskButton';
import MainStatus from './MainStatus';
import MolProbityTable from './MolProbity';

const Molstar = dynamic(() => import('./Molstar'), {
  ssr: false,
  loading: () => <Loader />,
});

const OutputView: FunctionComponent = () => {
  const {
    data: {
      status,
      image,
      molprobity,
      data,
      logs,
      dbnFile,
      solution,
      supercomposition,
      filteredpdb,
    } = {},
    isError,
  } = useGetStatus();

  if (status === 'error' || isError) {
    return (
      <MainStatus
        mainText={
          <div
            className={`mt-2 self-center whitespace-pre-wrap text-center text-2xl ${'text-dashas-red'}`}
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
      <div className="px-10">
        <MainStatus
          mainText={
            <div className="mt-3 flex w-full items-center justify-center text-3xl ">
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
              <DownloadFileButton fileName="output.dbn" file={dbnFile ?? ''} text="Download dbn" />
            </>
          }
        />
        {molprobity?.length !== 0 && <MolProbityTable molprobity={molprobity} />}
        <div className="mt-5 flex gap-2">
          <div className="w-full justify-center rounded-3xl bg-white md:w-1/2">
            <p className="rounded-t-2xl bg-dashas-pink py-2 text-center first-letter:text-dashas-purple">
              2D Structure
            </p>
            <div className="flex justify-center py-2">
              {image?.length !== 0 && (
                <img src={`data:image/svg+xml;base64,${image}`} alt="2d structure" />
              )}
            </div>
          </div>
          <div className="w-1/2">
            <p className="rounded-t-2xl bg-dashas-pink py-2 text-center first-letter:text-dashas-purple ">
              3D structure
            </p>
            <Molstar inputFile1={supercomposition ?? ''} inputFile2={filteredpdb ?? ''} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainStatus
      mainText={
        <div className="mt-2 self-center whitespace-pre-wrap text-center text-2xl">
          <Loader />
          Processing your file
        </div>
      }
      buttons={<DownloadFileButton fileName="input.pdb" file={data ?? ''} text="Download input" />}
    />
  );
};

export default OutputView;
