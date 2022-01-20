import '../styles/global.css';
import type { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import AppContextProvider from '@root/contextProviders/ContextProvider';
import { ToastContainer } from 'react-toastify';
import Layout from '../src/components/layouts/LayoutComponent';

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
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
    <ToastContainer />
  </>
);

export default MyApp;
