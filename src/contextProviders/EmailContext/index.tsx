import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type EmailContextProviderValues = [email: string, setEmail: Dispatch<SetStateAction<string>>];

const EmailContext = createContext({} as EmailContextProviderValues);

export const useEmailContext = (): void => {
  useContext(EmailContext);
};

const EmailContextProvider: FunctionComponent = ({ children }) => {
  const [email, setEmail] = useState('');
  return <EmailContext.Provider value={[email, setEmail]}>{children}</EmailContext.Provider>;
};

export default EmailContextProvider;
