import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import SingleCharInput from './SingleCharInput';

const LinkInput: FunctionComponent = () => {
  const [characters, setCharacters] = useState(Array(4).fill(''));
  const inputRefs = characters.map(() => React.createRef<HTMLInputElement>());

  const focusNext = (index: number): void => {
    if (index < inputRefs.length - 1) {
      if (inputRefs[index + 1].current) {
        // @ts-ignore
        inputRefs[index + 1].current.focus();
      }
    }
  };
  // Handle change for each input
  const handleChange = (index: number, value: string): void => {
    const newCharacters = [...characters];
    newCharacters[index] = value;
    setCharacters(newCharacters);
    // manage focus with enter
    if (value.length === 1) {
      focusNext(index);
    }
  };

  useEffect((): void => {
    // Focus first input
    if (inputRefs[0].current) {
      // @ts-ignore
      inputRefs[0].current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusPrev = (index: number): void => {
    if (index > 0) {
      if (inputRefs[index - 1].current) {
        // @ts-ignore
        inputRefs[index - 1].current.focus();
      }
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const index = inputRefs.findIndex((ref) => ref.current === event.target);

    if (event.key === 'ArrowRight') {
      focusNext(index);
    }

    // eslint-disable-next-line default-case
    switch (event.key) {
      case 'ArrowLeft':
        focusPrev(index);
        break;
      case 'ArrowRight':
        focusNext(index);
        break;
      case 'Backspace': {
        event.preventDefault();
        const newCharacters = [...characters];
        newCharacters[index] = '';
        setCharacters(newCharacters);
        focusPrev(index);
      }
    }
  };

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
            value={character}
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
