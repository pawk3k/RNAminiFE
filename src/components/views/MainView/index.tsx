import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
// @ts-ignore
import parsePdb from 'parse-pdb';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import useGetFromBank from '@hooks/queries/useGetFromBank';
import ProteinInput from './ProteinInput';
import Switch from './Switch/Switch';
import { toast } from 'react-toastify';
import SubmitButton from './SubmitButton/index';
import { useFileContext } from '../../../contextProviders/FileContextProvider/index';

const Main: NextPage = () => {
  const [isOk, setIsOk] = useState<boolean | null>(null);
  const [file, setFile] = useFileContext();
  const [email, setEmail] = useState<null | string>(null);
  const { characters } = useOTPContext();
  const { mutate: getDataFromBank } = useGetFromBank();

  const checkValidity = useCallback((): void => {
    const { atoms } = parsePdb(file);
    setIsOk(atoms.length > 0);
    if (atoms.length > 0) {
      toast('File upload sucseed!');
      // handleSendFileToServer();
    } else {
      toast('File upload failed!');
      setFile('');
    }
  }, [file]);

  useEffect(() => {
    if (file) {
      checkValidity();
    }
  }, [checkValidity, file]);

  const resetFile = (): void => {
    setFile('');
  };

  return (
    <div className="w-full px-4 md:p-14 flex-auto md:pl-44 md:pr-24 ">
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-center">
        <div className="text-md mt-4 md:mb-3 md:text-5xl xl:text-7xl justify-center lg:w-1/3 lg:mr-10 lg:ml-10 text-white text-shadow-xl">
          Start by uploading your file
        </div>
        <div className="w-full">
          <ProteinInput setFile={setFile} file={file} />
          <div className="pt-6 flex">
            <Switch setEmail={setEmail} />
            Notify me when results are ready
          </div>
          {email != null && (
            <input
              type="email"
              className="rounded-3xl mt-6 pl-4 h-9 w-full shadow-lg"
              placeholder="example@gmail.com"
            />
          )}
          <SubmitButton file={file} />
        </div>
      </div>
    </div>
  );
};

export default Main;
