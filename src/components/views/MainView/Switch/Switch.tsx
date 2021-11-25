import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';

type SwitchProps = {
  setEmail: Dispatch<SetStateAction<string | null>>;
};
const Switch: FunctionComponent<SwitchProps> = ({ setEmail }) => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = 'transform translate-x-5';
  const handleToggle = (): void => {
    setToggle((prevToggle) => !prevToggle);
    setEmail(toggle ? '' : null);
  };
  return (
    <div className="flex flex-col justify-center items-center pr-2">
      <button
        type="button"
        className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-pink-50 rounded-full p-1 cursor-pointer"
        onClick={handleToggle}
      >
        <div
          className={`bg-purple-300 border border-purple-500 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out${
            toggle ? null : toggleClass
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;
