import useOTP from '@hooks/useOTP';
import React, { ChangeEvent, FunctionComponent } from 'react';

import SingleCharInput from './SingleCharInput';

const LinkInput: FunctionComponent = () => {
  const { characters, handleKeyDown, handleChange, inputRefs } = useOTP();

  return (
    <div className="flex justify-center flex-col text-center pb-24">
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
    </div>
  );
};
export default LinkInput;
