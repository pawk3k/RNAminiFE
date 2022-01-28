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
      <div className="flex min-h-full  w-full  items-center justify-center">
        <div
          style={{
            background:
              'linear-gradient(297.8deg,rgba(100, 186, 170, 0.8) -3.14%,rgba(100, 186, 170, 0.01) 101.74%)',
          }}
          className="relative flex min-h-[648px] w-full flex-col rounded-3xl shadow-2xl md:relative md:mx-16 "
        >
          <nav className="flex w-full flex-col items-baseline justify-between pt-7 md:flex-row">
            <div className="flex w-full justify-center">
              <span className="pl-4 text-2xl font-bold text-white text-shadow-lg sm:text-5xl">
                <Link href="/main">RNArefiner</Link>
              </span>
              <button
                type="button"
                className="ml-5 flex items-center justify-between focus:outline-none md:hidden"
                onClick={(): void => setIsHamburgerOpen((prevState) => !prevState)}
              >
                <HamburgerMenu isOpen={!isHamburgerOpen} />
              </button>
            </div>
            <div
              className={`${
                isHamburgerOpen ? 'hidden' : ''
              }  w-full justify-end justify-around text-center last:mr-24 md:flex md:bg-none`}
            >
              <NavigationLink href="/home" />
              <NavigationLink href="/about" />
              <NavigationLink href="/help" />
              <NavigationLink href="/contact" />
            </div>
          </nav>
          <main className="relative flex h-max flex-grow items-center justify-center">
            {children}
          </main>
          <div className="relative bottom-0 left-4 flex">
            <PPLogo className="mb-4 inline h-20 w-20 rounded-full bg-white" />
            <Ibch className="h-20 w-20" />
            <RNAPolis className="relative  -left-24 h-16 self-center" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
