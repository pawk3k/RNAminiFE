/* eslint-disable no-bitwise */
import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import Loading from '../uiKit/Loading';
import NavigationLink from './LayoutComponent.styles';
import useNProgress from '../../hooks/useNProgress';
import HamburgerMenu from './HamburegerMenu';

const Layout: FunctionComponent = ({ children }) => {
  const state = useNProgress();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <div className="flex h-full justify-center  items-center md:py-16 w-full">
        <div
          style={{
            background:
              'linear-gradient(297.8deg,rgba(100, 186, 170, 0.8) -3.14%,rgba(100, 186, 170, 0.01) 101.74%)',
          }}
          className="md:mx-16 w-full rounded-3xl shadow-2xl md:relative"
        >
          <nav className="flex flex-col md:flex-row w-full justify-between items-baseline pt-7">
            <div className="flex gap-4">
              <span className="text-2xl sm:text-5xl font-bold pl-24 text-white text-shadow-lg">
                <Link href="/main">RNArefiner</Link>
              </span>
              <button
                type="button"
                className="flex items-center justify-between focus:outline-none md:hidden"
                onClick={(): void => setIsHamburgerOpen((prevState) => !prevState)}
              >
                <HamburgerMenu isOpen={!isHamburgerOpen} />
              </button>
            </div>
            <div
              className={`${
                isHamburgerOpen ? 'hidden' : ''
              }  w-full text-center md:bg-none md:flex justify-end gap-24 last:mr-24`}
            >
              <NavigationLink href="/about" />
              <NavigationLink href="/help" />
              <NavigationLink href="/contact" />
            </div>
          </nav>
          <main className="flex justify-center items-center">{children}</main>
        </div>
      </div>
    </>
  );
};
export default Layout;
