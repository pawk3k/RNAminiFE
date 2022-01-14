import EmailContextProvider from '../EmailContext';
import FileContextProvider from '../FileContextProvider';
import OTPContextProvider from '../OTPContext';
import QueryClientProvider from '../QueryClientProvider';
import combineComponents from '../utils/combineProviders';

const providers = [
  EmailContextProvider,
  FileContextProvider,
  QueryClientProvider,
  OTPContextProvider,
];

const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;
