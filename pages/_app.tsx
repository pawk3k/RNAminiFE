import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import Layout from '../src/components/layouts/LayoutComponent';
import '@reach/dialog/styles.css';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
