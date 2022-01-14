import useGetStatus from '@hooks/queries/useGetStatus';
import { FunctionComponent } from 'react';

const DownloadTaskButton: FunctionComponent = () => {
  const { data: { data } = {} } = useGetStatus();

  const handleDownloadFile = (): void => {
    const a = document.createElement('a');
    a.href = `data:text/plain;base64,${data}`;
    a.download = 'input.pdb';
    a.click();
  };

  return (
    <button
      type="button"
      onClick={handleDownloadFile}
      className="text-dashas-pink absolute bottom-5 ml-4 bg-dashas-purple px-9 rounded-full py-2 "
    >
      Download task
    </button>
  );
};
export default DownloadTaskButton;
