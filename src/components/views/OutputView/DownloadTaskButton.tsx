import { FunctionComponent } from 'react';

const DownloadTaskButton: FunctionComponent<{
  file: string;
  text: string | undefined;
  fileName: string;
}> = ({ file, text = 'Download Task s', fileName }) => {
  const handleDownloadFile = (): void => {
    const a = document.createElement('a');
    a.href = `data:text/plain;base64,${file}`;
    a.download = fileName;
    a.click();
  };

  return (
    <button
      type="button"
      onClick={handleDownloadFile}
      className="text-dashas-pink bottom-5 ml-4 bg-dashas-purple px-9 rounded-full py-2 "
    >
      {text}
    </button>
  );
};
export default DownloadTaskButton;
