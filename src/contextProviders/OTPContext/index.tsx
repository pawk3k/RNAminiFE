import useOTP from '@hooks/useOTP';
import { FunctionComponent } from 'react';
import OTPContext from './OTPContext';

const OTPContextProvider: FunctionComponent = ({ children }) => {
  const value = useOTP();
  return <OTPContext.Provider value={value}>{children}</OTPContext.Provider>;
};

export default OTPContextProvider;
