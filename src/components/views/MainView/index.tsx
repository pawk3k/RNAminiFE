import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import parsePdb from 'parse-pdb';
import ProteinInput from './ProteinInput';
import Switch from './Switch/Switch';
import Dialog from '../../uiKit/Dialog';

const Main: NextPage = () => {
  const [isOk, setIsOk] = useState<boolean | null>(null);
  const [file, setFile] = useState('');
  const [email, setEmail] = useState<null | string>(null);
  const [isOpen, setisOpen] = useState(false);

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

  const checkValidity = () => {
    const { atoms } = parsePdb(file);
    setIsOk(atoms.length > 0 ? true : false);
    setisOpen(true);
    if (atoms.length > 0) {
      // handleSendFileToServer();
    }
  };

  useEffect(() => {
    console.log(isOk);
    if (isOk !== null) {
      alert(isOk ? 'Data sent to processing' : 'File is not correct');
    }
  }, [isOk]);

  return (
    <div className="w-full h-full p-14 flex-auto">
      <main className="w-full h-full flex justify-around sm:flex-wrap md:flex-wrap lg:flex-nowrap">
        <div className="md:text-2xl md:mb-3 lg:text-8xl lg:mr-10 w-1/2 mt-10 ml-10 text-white text-shadow-xl">
          Start by uploading your file
        </div>
        <div className="w-1/2">
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
              onClick={checkValidity}
              type="submit"
              className="mt-6 relative rounded-3xl mx-auto w-1/3 h-10 text-center duration-300 bg-purple-300 shadow-xl transform focus:translate-y-1"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
      <Dialog isOpen={isOpen} onDissmis={(): void => setisOpen(false)}>
        {file ? (
          <div className="flex justify-center">File upload sucseed</div>
        ) : (
          <div className="flex justify-center flex-col">
            <p>There was an error in file you uploaded</p>
            <button
              onClick={(): void => {
                setFile('');
                setisOpen(false);
              }}
              type="button"
              className="bg-gray-100 shadow-lg  mt-4 w-1/2 self-center ring-blue-400 ring-1 rounded-2xl"
            >
              Try again{' '}
            </button>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Main;
