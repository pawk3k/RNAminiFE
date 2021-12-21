import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
// @ts-ignore
import parsePdb from 'parse-pdb';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import useGetFromBank from '@hooks/queries/useGetFromBank';
import ProteinInput from './ProteinInput';
import Switch from './Switch/Switch';
import { toast } from 'react-toastify';

const Main: NextPage = () => {
  const [isOk, setIsOk] = useState<boolean | null>(null);
  const [file, setFile] = useState('');
  const [email, setEmail] = useState<null | string>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { characters } = useOTPContext();
  const { mutate: getDataFromBank } = useGetFromBank();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSendFileToServer = async (): Promise<void> => {
    const response = await fetch('http://localhost:8080/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: file,
        email: null,
      }),
    }).then((res) => res.json());
    alert(response.uuid);
  };

  const checkValidity = useCallback((): void => {
    const { atoms } = parsePdb(file);
    setIsOk(atoms.length > 0);
    setIsOpen(true);
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
    setIsOpen(false);
  };

  return (
    <div className="w-full h-full px-4 md:p-14 flex-auto md:pl-44 md:pr-24 ">
      <main className="w-full h-full flex justify-around flex-wrap lg:flex-nowrap gap-6 ">
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
          <div className="flex">
            <button
              onClick={(): void => {
                getDataFromBank({
                  proteinChars: characters.join(''),
                });
              }}
              type="submit"
              className="shadow-md text-dashas-purple shadow-dashas-purple mt-6 relative rounded-3xl mx-auto w-1/3 h-10 text-center duration-300 bg-purple-300  transform focus:translate-y-1"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
