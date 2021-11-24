import { FunctionComponent, InputHTMLAttributes } from 'react';

export const SingleCharInput: FunctionComponent<
  InputHTMLAttributes<HTMLInputElement>
> = (props) => (
  <input
    maxLength={1}

    style={{
      backgroundColor: '#6100ff',
      
      color: '#FCEAFF',
      fontWeight: 'bold',
      textAlign: 'center',

    }}
    className="w-14 h-16 rounded-2xl border-2 border-purple-400 ml-4 outline-none"
    {...props}
  />
);
