import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html
        style={{
          background: 'linear-gradient(107.42deg, rgba(112, 75, 172, 0.9) 1.85%, #6100FF 100.59%)',
          backgroundSize: 'cover',
        }}
        lang="en"
        className="overflow-y-auto"
      >
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
