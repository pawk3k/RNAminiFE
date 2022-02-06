import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

const LinkWrapper = styled.span.attrs<{ isSelected: boolean }>({
  className:
    'capitalize flex font-bold text-2xl flex-col group text-white  text-shadow-lg transition-transform hover:transform duration-500 after:bg-dashas-pink after:self-center after:w-16',
})<{ isSelected: boolean }>`
  &::after {
    content: ' ';
    display: ${(props): string => (props.isSelected ? 'block' : 'none')};
    height: 0.2em;
    border-radius: 10px;
  }
`;
export const NavigationLink: FunctionComponent<{ href: string }> = ({ href }) => {
  const { route } = useRouter();
  return (
    <LinkWrapper isSelected={route === href}>
      <Link href={href}>{href.split('/')[1] === 'contact' ? 'cite us' : href.split('/')[1]}</Link>
    </LinkWrapper>
  );
};

export const Main = styled.main.attrs({
  className: 'flex h-max flex-grow items-center justify-center ',
})``;

export const Navigation = styled.nav.attrs({
  className: 'flex w-full flex-col items-baseline justify-between pt-7 md:flex-row',
})``;

export const LogosWrapper = styled.div.attrs({ className: 'relative bottom-0 left-4 flex' })``;

export const MainTileWithShadow = styled.div.attrs({
  className: 'relative flex flex-col gap-y-4 rounded-3xl shadow-2xl md:relative md:mx-16 md:mt-10',
})``;

export const AppName = styled.span.attrs({
  className: 'pl-4 text-2xl font-bold text-white text-shadow-lg sm:text-5xl pointer-events-none',
})``;
