import Button from '@components/uiKit/Button';
import Loader from '@components/views/OutputView/Loader';
import useNProgress from '@hooks/useNProgress/index';
import { useFileContext } from '@root/contextProviders/FileContextProvider';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import { FunctionComponent } from 'react';

const SubmitButton: FunctionComponent<{ isDisabled: boolean; isLoading: boolean }> = ({
  isDisabled,
  isLoading,
}) => {
  const { characters } = useOTPContext();
  const [file] = useFileContext();
  const { isRouteChanging } = useNProgress();

  const submitDisabled =
    (!file && characters.join('').length < 4) || isDisabled || isLoading || isRouteChanging;

  return (
    <div className="mb-2 flex w-full">
      <Button disabled={submitDisabled} type="submit">
        {isRouteChanging || isLoading ? (
          <>
            <Loader />
            <span>loading...</span>
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );
};
export default SubmitButton;
