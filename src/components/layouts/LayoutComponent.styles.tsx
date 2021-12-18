import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/dist/client/router';

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const NavigationLink: FunctionComponent<{ href: string }> = ({ href }) => {
  const { route } = useRouter();
  return (
    <span className=" flex font-bold text-2xl flex-col group text-white  text-shadow-lg transition-transform hover:transform duration-500  ">
      <Link href={href}>{capitalize(href.split('/')[1])}</Link>
      <div
        className={`${
          route === href && 'bg-gray-50'
        } group-hover:bg-white transform duration-500  group-hover:scale-x-110 w-24 h-1 self-center`}
      />
    </span>
  );
};
export default NavigationLink;
