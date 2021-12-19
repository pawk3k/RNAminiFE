import DragAndDrop from '@assets/DragAndDrop';
import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from 'react';

const FileInput: FunctionComponent<{ setFile: Dispatch<SetStateAction<string>> }> = ({
  setFile,
}) => {
  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (event): Promise<void> => {
      const text = event.target?.result;
      setFile(String(text));
    };
    reader.readAsText(e.target.files![0]);
  };

  return (
    <div className="py-8">
      <label htmlFor="pdb-file" className="w-full cursor-pointer">
        <div className="h-full rounded-b-3xl flex flex-col justify-center items-center">
          <DragAndDrop />
          <p className=" text-dashas-purple">Drag&Drop File here</p>
          <p className="my-5 text-dashas-purple">or</p>
          <span className="border-2 rounded-3xl text-dashas-purple px-7 text-lg border-dashas-purple">
            Browse Files
          </span>
        </div>
        <input
          id="pdb-file"
          name="pdb-file"
          type="file"
          accept=".pdb"
          className="hidden"
          onChange={handleUploadFile}
        />
      </label>
    </div>
  );
};
export default FileInput;
