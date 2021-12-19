import useGetFromBank from '@hooks/queries/useGetFromBank';
import useOTP from '@hooks/useOTP';
import React, { ChangeEvent, FunctionComponent } from 'react';

import SingleCharInput from './SingleCharInput';

const LinkInput: FunctionComponent = () => {
  const { characters, handleKeyDown, handleChange, inputRefs } = useOTP();
  const { mutate: getProteinFromBank } = useGetFromBank();

  return (
    <div className="flex justify-center flex-col text-center pb-8">
      <div className="mb-6 mt-11" style={{ color: '#6100ff' }}>
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
        onClick={(): void =>
          getProteinFromBank({
            proteinChars: characters.join(''),
          })
        }
      >
        get
      </button>
    </div>
  );
};
export default LinkInput;
