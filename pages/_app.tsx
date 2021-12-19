import '../styles/global.css';
// @ts-ignore

import type { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import QueryClientProvider from '@root/contextProviders/QueryClientProvider';
import { ReactQueryDevtools } from 'react-query/devtools';
import OTPContextProvider from '@root/contextProviders/OTPContext';
import Layout from '../src/components/layouts/LayoutComponent';
import 'react-toastify/dist/ReactToastify.css';
import '@reach/dialog/styles.css';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => (
  <OTPContextProvider>
    <QueryClientProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastContainer />
  </OTPContextProvider>
);

export default MyApp;
