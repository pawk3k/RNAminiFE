/* eslint-disable no-bitwise */
import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import { Ibch, PPLogo, RNAPolis } from '@assets/index';
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
      <div className="flex justify-center  items-center  w-full min-h-full">
        <div
          style={{
            background:
              'linear-gradient(297.8deg,rgba(100, 186, 170, 0.8) -3.14%,rgba(100, 186, 170, 0.01) 101.74%)',
          }}
          className="relative flex flex-col md:mx-16 w-full rounded-3xl shadow-2xl md:relative min-h-[648px] "
        >
          <nav className="flex flex-col md:flex-row w-full justify-between items-baseline pt-7">
            <div className="flex w-full justify-between">
              <span className="text-2xl sm:text-5xl font-bold pl-4 text-white text-shadow-lg">
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
              }  w-full text-center md:bg-none md:flex justify-end last:mr-24 justify-around`}
            >
              <NavigationLink href="/home" />
              <NavigationLink href="/about" />
              <NavigationLink href="/help" />
              <NavigationLink href="/contact" />
            </div>
          </nav>
          <main className="relative flex flex-grow justify-center items-center h-max">
            {children}
          </main>
          <div className="relative flex bottom-0 left-4 md:absolute">
            <PPLogo className="w-20 h-20 inline mb-4 bg-white rounded-full" />
            <Ibch className="w-20 h-20" />
            <RNAPolis className="w-40 h-20 self-end" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
