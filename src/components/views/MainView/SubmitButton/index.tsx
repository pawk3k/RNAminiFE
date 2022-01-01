import useAddFile from '@hooks/queries/useAddFile';
import useGetFromBank from '@hooks/queries/useGetFromBank';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import { FunctionComponent } from 'react';

const SubmitButton: FunctionComponent<{ file: string }> = ({ file }) => {
  const { characters } = useOTPContext();
  const { mutate: getDataFromBank } = useGetFromBank();
  const { mutate: sendFileToServer } = useAddFile();
  const submitDisabled = !file && characters.join('').length < 4;

  const handleSubmit = (): void => {
    if (characters.join('').length < 4) {
      sendFileToServer({ proteinChars: file });
    } else {
      getDataFromBank({
        proteinChars: characters.join(''),
      });
    }
  };
  return (
    <div className="flex mb-2">
      <button
        disabled={submitDisabled}
        onClick={handleSubmit}
        type="submit"
        className="disabled:bg-slate-400 disabled:shadow-none disabled:text-green-50 shadow-md text-dashas-purple shadow-dashas-purple mt-6 relative rounded-3xl mx-auto w-1/3 h-10 text-center duration-300 bg-purple-300  transform focus:translate-y-1"
      >
        Submit
      </button>
    </div>
  );
};
export default SubmitButton;
