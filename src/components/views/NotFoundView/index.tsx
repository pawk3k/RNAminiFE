import { Four, DnaIcon } from '@assets/index';

import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent } from 'react';

const NotFoundView: FunctionComponent = () => {
  const { push } = useRouter();
  return (
    <div className="mt-36 flex h-full flex-col items-center">
      <div className="flex items-center justify-center">
        <Four className="h-52 w-52" fill="" />
        <div className=" flex h-28 w-28 items-center justify-center">
          <DnaIcon className="h-20 w-20 fill-current transition-transform duration-500 hover:rotate-180 hover:scale-50 hover:transform " />
        </div>
        <Four className="h-52 w-52" fill="" />
      </div>
      <div className="mb-24 text-3xl">Page not found 😢</div>
      <button
        onClick={(): Promise<boolean> => push('/main')}
        className="rounded-3xl bg-gray-50 bg-dashas-purple px-10 py-2 text-dashas-pink ring-red-700"
        type="button"
      >
        Go back to our site 😍
      </button>
    </div>
  );
};

export default NotFoundView;
