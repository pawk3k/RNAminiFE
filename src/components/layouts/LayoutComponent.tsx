/* eslint-disable no-bitwise */
import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import Loading from '../uiKit/Loading';
import { NavigationLink } from './LayoutComponent.styles';
import useNProgress from '../hooks/useNProgress';
import HamburgerMenu from './HamburegerMenu';

const Layout: FunctionComponent = ({ children }) => {
  const state = useNProgress();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <div>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <div className="flex justify-center md:py-16 bg-purple-500 w-full">
        <div className="md:mx-16 bg-purple-400 w-full h-full rounded-3xl shadow-sm md:relative">
          <nav className="flex flex-col md:flex-row w-full justify-between align-baseline items-end pt-7">
            <div className="flex gap-4">
              <span className="text-2xl sm:text-5xl font-bold pl-24 text-white text-shadow-lg">
                <Link href="/main">RNArefiner</Link>
              </span>
              <button
                type="button"
                className="flex items-center justify-between focus:outline-none md:hidden"
                onClick={(): void => setIsHamburgerOpen((prevState) => !prevState)}
              >
                <span>{isHamburgerOpen ? 'Open' : 'Close'}</span>
                <HamburgerMenu isOpen={isHamburgerOpen} />
              </button>
            </div>
            <div className={`${isHamburgerOpen ? 'hidden' : ''} w-full text-center md:contents`}>
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
