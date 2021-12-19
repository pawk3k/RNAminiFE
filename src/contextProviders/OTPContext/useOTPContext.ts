import { UseOTPReturnType } from '@hooks/useOTP/useOTP.types';
import { useContext } from 'react';
import OTPContext from './OTPContext';

const useOTPContext = (): UseOTPReturnType => useContext(OTPContext);

export default useOTPContext;
