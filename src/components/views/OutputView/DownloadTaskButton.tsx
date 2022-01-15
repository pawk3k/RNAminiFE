import { FunctionComponent } from 'react';

const DownloadTaskButton: FunctionComponent<{ file: string; text: string | undefined }> = ({
  file,
  text = 'Download Task s',
}) => {
  const handleDownloadFile = (): void => {
    const a = document.createElement('a');
    a.href = `data:text/plain;base64,${file}`;
    a.download = 'input.pdb';
    a.click();
  };

  return (
    <button
      type="button"
      onClick={handleDownloadFile}
      className="text-dashas-pink absolute bottom-5 ml-4 bg-dashas-purple px-9 rounded-full py-2 "
    >
      {text}
    </button>
  );
};
export default DownloadTaskButton;
