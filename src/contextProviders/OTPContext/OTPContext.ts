import { UseOTPReturnType } from '@hooks/useOTP/useOTP.types';
import { createContext } from 'react';

const OTPContext = createContext({} as UseOTPReturnType);

export default OTPContext;
