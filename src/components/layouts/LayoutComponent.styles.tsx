import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/dist/client/router';

const navigationStyle =
  'flex flex-col group text-white  text-shadow-lg transition-transform hover:transform duration-500 ';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const NavigationLink: FunctionComponent<{ href: string }> = ({ href }) => {
  const { route } = useRouter();
  return (
    <span className={navigationStyle}>
      <Link href={href}>{capitalize(href.split('/')[1])}</Link>
      <div
        className={`${
          route === href && 'bg-gray-50'
        } group-hover:bg-white transform duration-500 group-hover:scale-x-150   w-6 h-1 self-center`}
      />
    </span>
  );
};
