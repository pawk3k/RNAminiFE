import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent } from 'react';
import DnaSvg from '../../../assets/DnaSvg';
import FourSvg from '../../../assets/FourSvg';
import Dialog from '../../uiKit/Dialog';

const NotFoundView: FunctionComponent = () => {
  const { push } = useRouter();
  return (
    <div className="h-full flex mt-36 flex-col items-center">
      <div className="flex justify-center items-center">
        <FourSvg className="" fill="" />
        <div className=" w-28 h-28 flex justify-center items-center">
          <DnaSvg className="duration-500 fill-current transition-transform w-20 h-20 hover:transform hover:rotate-180 hover:scale-50 " />
        </div>
        <FourSvg className="" fill="" />
      </div>
      <div className="text-3xl mb-24">Page not found 😢</div>
      <button
        onClick={(): Promise<boolean> => push('/main')}
        className="bg-gray-50 rounded-3xl px-10 py-2 ring-red-700 bg-dashas-purple text-dashas-pink"
        type="button"
      >
        Go back to our site 😍
      </button>
    </div>
  );
};

export default NotFoundView;
