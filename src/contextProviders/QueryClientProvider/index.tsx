import { FunctionComponent } from 'react';

import { QueryClientProvider as ReactQueryClientProvider, QueryClient } from 'react-query';

const QueryClientProvider: FunctionComponent = ({ children }) => {
  const queryClient = new QueryClient();
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
