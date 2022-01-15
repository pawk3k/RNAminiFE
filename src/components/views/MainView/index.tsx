import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
// @ts-ignore
import parsePdb from 'parse-pdb';
import { toast } from 'react-toastify';
import { useToggle } from 'react-use';
import ProteinInput from './ProteinInput';
import Switch from './Switch/Switch';
import SubmitButton from './SubmitButton/index';
import { useFileContext } from '../../../contextProviders/FileContextProvider/index';
import EmailInput from './EmailInput';

const Main: NextPage = () => {
  const [, setIsOk] = useState<boolean | null>(null);
  const [file, setFile] = useFileContext();

  const [toggle, setToggle] = useToggle(false);

  const checkValidity = useCallback((): void => {
    const { atoms } = parsePdb(file);
    setIsOk(atoms.length > 0);
    if (atoms.length > 0) {
      toast('File upload succeed!');
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
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-center">
        <div className="text-md mt-4 md:mb-3 md:text-5xl xl:text-7xl justify-center lg:w-1/3 lg:mr-10 lg:ml-10 text-white text-shadow-xl">
          Start by uploading your file
        </div>
        <div className="w-full">
          <ProteinInput setFile={setFile} file={file} />
          <div className="pt-6 flex">
            <Switch setToggle={setToggle} />
            Notify me when results are ready
          </div>
          {toggle && <EmailInput />}
          <SubmitButton />
        </div>
      </div>
    </div>
  );
};

export default Main;
