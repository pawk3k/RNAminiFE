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
    <div className="w-full px-4 md:p-14 flex-auto md:pl-44 md:pr-24 ">
      <div className="w-full flex gap-x-8 flex-wrap lg:flex-nowrap items-center justify-center">
        <div className="text-6xl flex-wrap font-bold self-start mt-4 md:mb-3 justify-center lg:w-1/3 lg:mr-10 lg:ml-10 text-white text-shadow-xl">
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
