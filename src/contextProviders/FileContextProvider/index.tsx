import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type FileContextType = [file: string, setFile: Dispatch<SetStateAction<string>>];

const FileContext = createContext({} as FileContextType);

export const useFileContext = () => useContext(FileContext);

const FileContextProvider: FunctionComponent = ({ children }) => {
  const [file, setFile] = useState('');
  return <FileContext.Provider value={[file, setFile]}>{children}</FileContext.Provider>;
};

export default FileContextProvider;
