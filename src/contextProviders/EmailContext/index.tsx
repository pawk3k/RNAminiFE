import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type EmailContextProviderValues = [
  email: string | null,
  setEmail: Dispatch<SetStateAction<string | null>>,
];

const EmailContext = createContext({} as EmailContextProviderValues);

export const useEmailContext = (): EmailContextProviderValues => useContext(EmailContext);

const EmailContextProvider: FunctionComponent = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  return <EmailContext.Provider value={[email, setEmail]}>{children}</EmailContext.Provider>;
};

export default EmailContextProvider;
