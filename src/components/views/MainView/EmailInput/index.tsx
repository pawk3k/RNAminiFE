import { useEmailContext } from '@root/contextProviders/EmailContext';
import { FunctionComponent } from 'react';

const EmailInput: FunctionComponent = () => {
  const [, setEmail] = useEmailContext();
  return (
    <input
      type="email"
      onChange={(e): void => setEmail(e.target.value)}
      className="rounded-3xl mt-6 pl-4 h-9 w-full shadow-lg"
      placeholder="example@gmail.com"
    />
  );
};

export default EmailInput;
