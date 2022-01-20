import { FunctionComponent } from 'react';
import useAddFile from '@hooks/queries/useAddFile';
import useGetFromBank from '@hooks/queries/useGetFromBank';
import { useEmailContext } from '@root/contextProviders/EmailContext';
import { useFileContext } from '@root/contextProviders/FileContextProvider';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import { useToggle } from 'react-use';
import EmailInput from './EmailInput';
import SubmitButton from './SubmitButton';
import Switch from './Switch/Switch';

const UserForm: FunctionComponent = () => {
  const { characters } = useOTPContext();
  const [file] = useFileContext();
  const [email] = useEmailContext();
  const { mutate: getDataFromBank } = useGetFromBank();
  const { mutate: sendFileToServer, isSuccess } = useAddFile();
  const isResolved = isSuccess;
  const [toggle, setToggle] = useToggle(false);
  const handleSubmit = (): void => {
    // If file from user
    if (characters.join('').length < 4) {
      sendFileToServer({ file, email });
    } else {
      getDataFromBank({
        proteinChars: characters.join(''),
      });
    }
  };
  return (
    <form
      onSubmit={(e): void => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="pt-6 flex">
        <Switch setToggle={setToggle} />
        <span className="text-dashas-pink">Notify me when results are ready</span>
      </div>
      {toggle && <EmailInput />}
      <SubmitButton isDisabled={isResolved} />
    </form>
  );
};

export default UserForm;
