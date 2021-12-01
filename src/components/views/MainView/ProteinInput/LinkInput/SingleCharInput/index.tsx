import { forwardRef, InputHTMLAttributes } from 'react';

const SingleCharInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      style={{
        backgroundColor: '#6100ff',
        color: '#FCEAFF',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
      className="w-14 h-16 text-2xl rounded-2xl border-2 border-purple-400 ml-4 outline-none"
      {...props}
    />
  ),
);

export default SingleCharInput;
