import React, { useEffect, useState } from 'react';
import { UseOTPReturnType } from './useOTP.types';

const useOTP = (numberOfCharacters: number = 4): UseOTPReturnType => {
  const [characters, setCharacters] = useState(Array(numberOfCharacters).fill(''));
  const inputRefs = characters.map(() => React.createRef<HTMLInputElement>());
  const clear = (): void => setCharacters(Array(numberOfCharacters).fill(''));

  const focusNext = (index: number): void => {
    if (index < inputRefs.length - 1) {
      if (inputRefs[index + 1].current) {
        // @ts-ignore
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleChange = (index: number, value: string): void => {
    const newCharacters = [...characters];
    newCharacters[index] = value.length > 1 ? value.split(characters[index]).join('') : value;
    setCharacters(newCharacters);
    if (newCharacters[index].length === 1) {
      focusNext(index);
    }
  };

  useEffect((): void => {
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
    }
  };
  return { characters, handleKeyDown, handleChange, inputRefs, clear };
};

export default useOTP;
