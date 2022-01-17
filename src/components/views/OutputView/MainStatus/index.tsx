import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

const MainStatus: FunctionComponent<{ buttons: JSX.Element; mainText: JSX.Element }> = ({
  buttons,
  mainText,
}) => {
  const { query } = useRouter();

  return (
    <div className="flex  my-28 justify-center items-center flex-col px-24">
      <div className="my-auto h-full flex justify-around items-center text-dashas-purple">
        <div className="min-w-[500px] mx-9 px-7 relative bg-dashas-pink rounded-3xl h-60 flex justify-around items-start flex-col">
          <div className="mt-11">Task : {query.uid}</div>
          {mainText}

          <div className="flex w-full justify-center self-end">{buttons}</div>
        </div>
      </div>
    </div>
  );
};

export default MainStatus;
