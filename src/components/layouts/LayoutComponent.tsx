import React, { FunctionComponent, useState } from 'react';
import { Ibch, PPLogo, RNAPolis } from '@assets/index';
import Loading from '../uiKit/Loading';
import {
  NavigationLink,
  Main,
  Navigation,
  LogosWrapper,
  MainTileWithShadow,
  AppName,
} from './LayoutComponent.styles';
import useNProgress from '../../hooks/useNProgress';
import HamburgerMenu from './HamburegerMenu';

const Layout: FunctionComponent = ({ children }) => {
  const { isRouteChanging, loadingKey } = useNProgress();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <>
      <Loading isRouteChanging={isRouteChanging} key={loadingKey} />
      <MainTileWithShadow
        style={{
          background:
            'linear-gradient(297.8deg,rgba(100, 186, 170, 0.8) -3.14%,rgba(100, 186, 170, 0.01) 101.74%)',
        }}
      >
        <Navigation>
          <div className="flex w-full justify-center">
            <AppName>RNArefiner</AppName>
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
        </Navigation>
        <Main>{children}</Main>
        <LogosWrapper>
          <PPLogo className="mb-4 inline h-20 w-20 rounded-full bg-white" />
          <Ibch className="h-20 w-20" />
          <RNAPolis className="h-20 w-64 self-center" />
        </LogosWrapper>
      </MainTileWithShadow>
    </>
  );
};
export default Layout;
