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
export const NavigationWrapper = styled.nav.attrs({
  className: 'flex w-full flex-col items-baseline justify-between pt-7 md:flex-row',
})``;
