import Loader from '@components/views/OutputView/Loader';
import { useFileContext } from '@root/contextProviders/FileContextProvider';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';

const SubmitButton: FunctionComponent<{ isDisabled: boolean; isLoading: boolean }> = ({
  isDisabled,
  isLoading,
}) => {
  const { characters } = useOTPContext();
  const [file] = useFileContext();
  const [isRouteChanging, setRouteChanging] = useState(false);
  const router = useRouter();
  const submitDisabled =
    (!file && characters.join('').length < 4) || isDisabled || isLoading || isRouteChanging;

  useEffect(() => {
    router.events.on('routeChangeStart', (): void => setRouteChanging(true));
    router.events.on('routeChangeComplete', (): void => setRouteChanging(false));
    router.events.on('routeChangeError', (): void => setRouteChanging(false));
    return (): void => {
      router.events.on('routeChangeStart', (): void => setRouteChanging(true));
      router.events.on('routeChangeComplete', (): void => setRouteChanging(false));
      router.events.on('routeChangeError', (): void => setRouteChanging(false));
    };
  }, [router.events]);
  return (
    <div className="flex mb-2 w-full">
      <button
        disabled={submitDisabled}
        type="submit"
        className="disabled:bg-slate-400 disabled:shadow-none disabled:text-green-50 shadow-md text-dashas-purple shadow-dashas-purple mt-6 relative rounded-3xl mx-auto w-1/2 h-10 text-center duration-300 bg-dashas-pink  transform focus:translate-y-1"
      >
        {isRouteChanging || isLoading ? (
          <>
            <Loader />
            <span>loading...</span>
          </>
        ) : (
          'Submit'
        )}
      </button>
    </div>
  );
};
export default SubmitButton;
