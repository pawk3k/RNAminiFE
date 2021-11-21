import { FunctionComponent } from 'react';
import Link from 'next/link';

const style =
  'h-12 rounded bg-gray-400 even:bg-gray-200 cursor-pointer  hover:bg-500 text-center pt-3';

{
  /* <div className="text-white"> </div>; */
}
const navigationStyle = 'text-white text-shadow-lg';
const pages = ['main', 'about', 'contact', 'help', 'output'];

export const Layout: FunctionComponent = ({ children }) => (
  <div className="h-screen flex justify-center py-16 bg-purple-500">
    <div className="mx-16 bg-purple-400 w-full h-full rounded-3xl shadow-sm ">
      <nav className="flex w-full justify-between">
        <span className="text-5xl font-bold pt-7 pl-24 text-white text-shadow-lg">
          <Link href="/main">RNArefiner</Link>
        </span>

        <div className="flex justify-around w-1/4 pt-12">
          <span className={navigationStyle}>
            <Link href="/about">About</Link>
          </span>
          <span className={navigationStyle}>
            <Link href="/help">Help</Link>
          </span>
          <span className={navigationStyle + ' pr-12'}>
            <Link href="/contact">Cite us</Link>
          </span>
        </div>
      </nav>
      <div className="w-full h-full">{children}</div>
    </div>
    {/* <header className="fixed w-full text-center text-2xl bg-green-500">
      <h1>RNArefiner</h1>
    </header> */}

    {/* 
    <aside className="bg-black-05 z-10 w-28 text-center left-0 fixed">
      <div className="flex flex-col h-full mt-96">
        <ul>
          {pages.map((page) => {
            return (
              <div key={page} className={style}>
                <Link href={page}>{page}</Link>
              </div>
            );
          })}
        </ul>
      </div>
    </aside> */}
    {/* <main className="text-center">
      <div className="flex justify-center items-center h-full">{children}</div>
    </main>
    <footer className="fixed bottom-0  bg-green-500 w-full text-center">
      Terms and conditions
    </footer> */}
  </div>
);
