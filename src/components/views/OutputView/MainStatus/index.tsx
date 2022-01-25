import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

const MainStatus: FunctionComponent<{ buttons: JSX.Element; mainText: JSX.Element }> = ({
  buttons,
  mainText,
}) => {
  const { query } = useRouter();

  return (
    <div className="my-28  flex flex-col items-center justify-center px-24">
      <div className="my-auto flex h-full items-center justify-around text-dashas-purple">
        <div className="relative mx-9 flex h-60 min-w-[500px] flex-col items-start justify-around rounded-3xl bg-dashas-pink px-7">
          <div className="mt-11">Task : {query.uid}</div>
          {mainText}
          <div className="flex w-full items-center justify-center">{buttons}</div>
        </div>
      </div>
    </div>
  );
};

export default MainStatus;
