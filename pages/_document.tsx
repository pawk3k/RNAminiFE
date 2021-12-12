import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" className="antialiased h-full">
        <Head />
        <body className="overflow-hidden h-full">
          <style>
            {`
            #__next { height: 100% }
          `}
          </style>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
