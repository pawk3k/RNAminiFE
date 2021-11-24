import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
// @ts-ignore
import ProteinInput from './ProteinInput';
import Switch from './Switch/Switch';

const Main: NextPage = () => {
  const [isOk] = useState<boolean | null>(null);
  const [file, setFile] = useState('');

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
            <Switch />
            Notify me when results are ready
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
