import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
// @ts-ignore
import parsePdb from 'parse-pdb';
import { toast } from 'react-toastify';
import ProteinInput from './ProteinInput';
import { useFileContext } from '../../../contextProviders/FileContextProvider/index';
import UserForm from './UserForm';

const Main: NextPage = () => {
  const [, setIsOk] = useState<boolean | null>(null);
  const [file, setFile] = useFileContext();

  const checkValidity = useCallback((): void => {
    const { atoms } = parsePdb(file);
    setIsOk(atoms.length > 0);
    if (atoms.length > 0) {
      // toast('File upload succeed!');
      // handleSendFileToServer();
    } else {
      toast('File upload failed!');
      setFile('');
    }
  }, [file, setFile]);

  useEffect(() => {
    if (file) {
      checkValidity();
    }
  }, [checkValidity, file]);

  return (
    <div className="w-full flex-auto px-4 md:p-14 md:pl-44 md:pr-24 ">
      <div className="flex w-full flex-wrap items-center justify-center gap-x-8 lg:flex-nowrap">
        <div className="mt-4 flex-wrap justify-center self-start text-center text-2xl font-bold text-white text-shadow-xl md:mb-3 md:text-6xl lg:mr-10 lg:ml-10 lg:w-1/3">
          Start by uploading your file
        </div>
        <div className="w-full">
          <ProteinInput />
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default Main;
