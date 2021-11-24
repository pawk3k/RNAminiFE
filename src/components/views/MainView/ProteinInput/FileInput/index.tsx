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
    <label htmlFor="pdb-file" className="w-full h-full cursor-pointer">
      <div className="h-full rounded-b-3xl flex flex-col justify-center items-center">
        <p>Drag&Drop File here</p>
        <p className="my-5">or</p>
        <span className="border-2 rounded-2xl px-7 text-lg border-purple-700">Browse Files</span>
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
  );
};
export default FileInput;
