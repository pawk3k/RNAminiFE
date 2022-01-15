import { FunctionComponent } from 'react';

type SwitchProps = {
  setToggle: (nextValue?: boolean) => void;
};
const Switch: FunctionComponent<SwitchProps> = ({ setToggle }) => (
  <div className="flex flex-col justify-center items-center pr-2 group">
    <label htmlFor="switch">
      <div className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-pink-50 rounded-full p-1 cursor-pointer">
        <input
          onClick={(): void => setToggle()}
          type="checkbox"
          name="switch"
          id="switch"
          className="hidden peer"
        />
        <div className="bg-gray-400 peer-checked:translate-x-5 peer-checked:bg-dashas-purple border border-purple-500 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" />
      </div>
    </label>
  </div>
);
export default Switch;
