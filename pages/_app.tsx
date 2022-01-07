import '../styles/global.css';
// @ts-ignore

import type { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import QueryClientProvider from '@root/contextProviders/QueryClientProvider';
import { ReactQueryDevtools } from 'react-query/devtools';
import OTPContextProvider from '@root/contextProviders/OTPContext';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../src/components/layouts/LayoutComponent';
import FileContextProvider from '@root/contextProviders/FileContextProvider';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>RNA refiner</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, height=device-height"
      />
      <meta name="description" content="Engineering work for PUT" />
    </Head>
    <OTPContextProvider>
      <QueryClientProvider>
        <FileContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FileContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </OTPContextProvider>
  </>
);

export default MyApp;
