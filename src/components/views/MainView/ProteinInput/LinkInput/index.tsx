import useGetFromBank from '@hooks/queries/useGetFromBank';
import useOTP from '@hooks/useOTP';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { toast } from 'react-toastify';

import SingleCharInput from './SingleCharInput';

const LinkInput: FunctionComponent = () => {
  const { characters, handleKeyDown, handleChange, inputRefs } = useOTP();
  const { data } = useGetFromBank();
  console.log(data);

  return (
    <div className="flex justify-center flex-col text-center">
      <div className="mb-6 mt-16" style={{ color: '#6100ff' }}>
        Enter PDB id
      </div>
      <div>
        {characters.map((character, index) => (
          <SingleCharInput
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onKeyDown={handleKeyDown}
            value={character || ''}
            ref={inputRefs[index]}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>): void =>
              handleChange(index, value)
            }
          />
        ))}
      </div>

      {/* add buttons styles with tailwind */}
      <button
        className="w-40 mx-auto mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={(): React.ReactText => toast('Wow so easy!')}
      >
        get
      </button>
    </div>
  );
};
export default LinkInput;
