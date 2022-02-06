/* eslint-disable no-bitwise */
import { FunctionComponent, useState } from 'react';
import HamburgerMenu from './HamburegerMenu';
import { AppName } from '../LayoutComponent.styles';

import { NavigationLink, NavigationWrapper } from './Navigation.styles';

const Navigation: FunctionComponent = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  return (
    <NavigationWrapper>
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
    </NavigationWrapper>
  );
};

export default Navigation;
