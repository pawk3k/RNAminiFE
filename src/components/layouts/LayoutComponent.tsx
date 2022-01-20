/* eslint-disable no-bitwise */
import React, { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
          className="flex flex-col md:mx-16 w-full rounded-3xl shadow-2xl md:relative min-h-[648px] "
        >
          <nav className="flex flex-col md:flex-row w-full justify-between items-baseline pt-7">
            <div className="flex w-full justify-between">
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
          <main className="relative flex flex-grow justify-center items-center h-max">
            {children}
          </main>
          <div className="relative bottom-0 left-4">
            <Image
              alt="pps"
              width="80"
              height="80"
              src="/pp.png"
              className="bg-white rounded-full"
            />
            <Image
              alt="pp"
              width={85}
              height={73}
              src="https://www.ibch.poznan.pl/graphics/ichbpan_logo_short_en.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
