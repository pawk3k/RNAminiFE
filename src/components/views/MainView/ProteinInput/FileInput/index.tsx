import { DragAndDrop } from '@assets/index';
import { useFileContext } from '@root/contextProviders/FileContextProvider';
import { ChangeEvent, FunctionComponent, useRef, useState } from 'react';

const FileInput: FunctionComponent = () => {
  const [, setFile] = useFileContext();
  const [isDraggedOver, setDraggedOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (event): Promise<void> => {
      const text = event.target?.result;
      setFile(String(text));
    };
    reader.readAsText(e.target.files![0]);
  };

  const handleDragAndDrop = (e: ChangeEvent<HTMLDivElement>): void => {
    e.preventDefault();
    // @ts-ignore
    const file = e.dataTransfer?.files![0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (event): Promise<void> => {
        const text = event.target?.result;
        setFile(String(text));
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: ChangeEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e: ChangeEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDraggedOver(false);
  };
  const handleDragEnd = (e: ChangeEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDraggedOver(false);
  };

  return (
    <div
      className={`py-8 ${
        isDraggedOver
          ? 'transform rounded-3xl border-t-0 ring-4 ring-dashas-purple transition-shadow'
          : ''
      }`}
      // @ts-ignore
      onDragLeave={handleDragLeave}
      // @ts-ignore
      onDrop={handleDragAndDrop}
      // @ts-ignore
      onDragOver={handleDragOver}
      // @ts-ignore
      onDragEnd={handleDragEnd}
    >
      <label htmlFor="pdb-file" className="w-full cursor-pointer">
        <div className="flex h-full flex-col items-center justify-center rounded-b-3xl text-dashas-purple">
          <DragAndDrop className=" h-20 w-20" />
          <p>Drag&Drop File here</p>
          <p className="my-5">or</p>
          <span className="rounded-3xl border-2 border-dashas-purple px-7 text-lg text-dashas-purple">
            Browse Files
          </span>
        </div>
        <input
          ref={fileInputRef}
          id="pdb-file"
          name="pdb-file"
          type="file"
          className="hidden"
          accept=".pdb"
          onChange={handleUploadFile}
        />
      </label>
    </div>
  );
};
export default FileInput;
