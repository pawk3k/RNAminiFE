import Button from '@components/uiKit/Button';
import useOTPContext from '@root/contextProviders/OTPContext/useOTPContext';
import React, { ChangeEvent, FunctionComponent } from 'react';

import SingleCharInput from './SingleCharInput';

const LinkInput: FunctionComponent = () => {
  const { characters, handleKeyDown, handleChange, inputRefs, clear } = useOTPContext();
  const clearAllDisabled = characters.join('').length < 1;

  return (
    <div className="flex flex-col justify-center py-8 text-center">
      <div className="mb-6 mt-6" style={{ color: '#6100ff' }}>
        Enter PDB id
      </div>
      <div className="">
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

        <Button disabled={clearAllDisabled} onClick={(): void => clear()}>
          Clear All
        </Button>
      </div>
    </div>
  );
};
export default LinkInput;
