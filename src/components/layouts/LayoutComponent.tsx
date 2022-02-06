import React, { FunctionComponent } from 'react';
import { Ibch, PPLogo, RNAPolis } from '@assets/index';
import Loading from '../uiKit/Loading';
import { Main, LogosWrapper, MainTileWithShadow } from './LayoutComponent.styles';
import useNProgress from '../../hooks/useNProgress';
import Navigation from './Navigation';

const Layout: FunctionComponent = ({ children }) => {
  const { isRouteChanging, loadingKey } = useNProgress();

  return (
    <>
      <Loading isRouteChanging={isRouteChanging} key={loadingKey} />
      <MainTileWithShadow
        style={{
          background:
            'linear-gradient(297.8deg,rgba(100, 186, 170, 0.8) -3.14%,rgba(100, 186, 170, 0.01) 101.74%)',
        }}
      >
        <Navigation />
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
