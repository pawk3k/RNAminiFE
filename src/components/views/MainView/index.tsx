import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
// @ts-ignore
import ProteinInput from './ProteinInput';
import Switch from './Switch/Switch';

const Main: NextPage = () => {
  const [isOk] = useState<boolean | null>(null);
  const [file, setFile] = useState('');
  const [email, setEmail] = useState<null | string>(null);

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

  useEffect(() => {
    if (isOk) {
      // alert(isOk ? 'Data sent to processing' : 'File is not correct');
    }
  }, [isOk]);

  return (
    <div className="w-full h-full p-14">
      <main className="w-full h-full flex justify-around">
        <div>Get started by uploading file or picking from Protein DB</div>
        <div className="w-1/2">
          <ProteinInput setFile={setFile} />
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
              type="submit"
              className="mt-6 relative rounded-3xl mx-auto w-1/3 h-10 text-center duration-300 bg-purple-300 shadow-xl transform focus:translate-y-1"
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
