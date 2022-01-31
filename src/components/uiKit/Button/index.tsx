import { ComponentPropsWithoutRef, FunctionComponent } from 'react';

const Button: FunctionComponent<ComponentPropsWithoutRef<'button'>> = ({ ...props }) => (
  <button
    {...props}
    type="submit"
    className="relative mx-auto mt-6 h-10 w-1/2 transform rounded-3xl bg-dashas-pink text-center text-dashas-purple shadow-md shadow-dashas-purple duration-300 focus:translate-y-1 disabled:bg-slate-400  disabled:text-green-50 disabled:shadow-none"
  />
);

export default Button;
