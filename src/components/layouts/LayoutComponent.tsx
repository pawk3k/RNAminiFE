import { FunctionComponent } from 'react';
import Link from 'next/link';

const navigationStyle = 'text-white text-shadow-lg';

const Layout: FunctionComponent = ({ children }) => (
  <div className="h-screen flex justify-center py-16 bg-purple-500">
    <div className="mx-16 bg-purple-400 w-full h-full rounded-3xl shadow-sm relative">
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
          <span className={`${navigationStyle} pr-12`}>
            <Link href="/contact">Cite us</Link>
          </span>
        </div>
      </nav>
      <div className="w-full h-full">{children}</div>
    </div>
  </div>
);
export default Layout;
