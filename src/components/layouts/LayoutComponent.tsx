/* eslint-disable no-bitwise */
import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Loading from '../uiKit/Loading';

const navigationStyle = 'text-white text-shadow-lg';

const Layout: FunctionComponent = ({ children }) => {
  const router = useRouter();

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    const handleRouteChangeStart = (): void => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        // @ts-ignore
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = (): void => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return (): void => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <div>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <div className="h-screen flex justify-center py-16 bg-purple-500">
        <div className="mx-16 bg-purple-400 w-full h-full rounded-3xl shadow-sm relative">
          <nav className="flex w-full justify-between align-baseline items-end pt-7">
            <span className="text-5xl font-bold pl-24 text-white text-shadow-lg">
              <Link href="/main">RNArefiner</Link>
            </span>

            <div className="flex justify-around w-1/4 ">
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
          <div className="w-full  relative">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
