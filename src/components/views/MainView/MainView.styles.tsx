import useGetFromBank from '@hooks/queries/useGetFromBank';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import { FunctionComponent } from 'react';
import SingleCharInput from './ProteinInput/LinkInput/SingleCharInput/index';

const SubmitButton: FunctionComponent<{ file: string }> = ({ file }) => {
  const { characters } = useOTPContext();
  const { mutate: getDataFromBank } = useGetFromBank();
  const submitDisabled = !file && characters.join('').length < 4;
  return (
    <div className="flex">
      <button
        disabled={submitDisabled}
        onClick={(): void => {
          getDataFromBank({
            proteinChars: characters.join(''),
          });
        }}
        type="submit"
        className="disabled:bg-slate-400 disabled:shadow-none disabled:text-green-50 shadow-md text-dashas-purple shadow-dashas-purple mt-6 relative rounded-3xl mx-auto w-1/3 h-10 text-center duration-300 bg-purple-300  transform focus:translate-y-1"
      >
        Submit
      </button>
    </div>
  );
};
export default SubmitButton;
