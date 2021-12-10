/* eslint-disable no-bitwise */
import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import Loading from '../uiKit/Loading';
import { NavigationLink } from './LayoutComponent.styles';
import useNProgress from '../hooks/useNProgress';

const Layout: FunctionComponent = ({ children }) => {
  const state = useNProgress();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <div>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <div className="h-screen flex justify-center py-16 bg-purple-500">
        <div className="mx-16 bg-purple-400 w-full h-full rounded-3xl shadow-sm relative">
          <nav className="flex w-full justify-between align-baseline items-end pt-7">
            <span className="text-2xl sm:text-5xl font-bold pl-24 text-white text-shadow-lg">
              <Link href="/main">RNArefiner</Link>
            </span>
            <button
              type="button"
              className="bg-white"
              onClick={(): void => setIsHamburgerOpen((prevState) => !prevState)}
            >
              {isHamburgerOpen ? 'Open' : 'Close'}
            </button>
            <div className="hidden md:flex justify-around w-1/4 ">
              <NavigationLink href="/about" />
              <NavigationLink href="/help" />
              <NavigationLink href="/contact" />
            </div>
          </nav>
          <div className="w-full relative">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
