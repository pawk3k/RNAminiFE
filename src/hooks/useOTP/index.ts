import React, { useEffect, useState } from 'react';

const useOTP = (
  numberOfCharacters: number = 4,
): {
  characters: string[];
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (index: number, value: string) => void;
  inputRefs: React.RefObject<HTMLInputElement>[];
} => {
  const [characters, setCharacters] = useState(Array(numberOfCharacters).fill(''));
  const inputRefs = characters.map(() => React.createRef<HTMLInputElement>());

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
      case 'Backspace': {
        event.preventDefault();
        const newCharacters = [...characters];
        newCharacters[index] = '';
        setCharacters(newCharacters);
        focusPrev(index);
      }
    }
  };
  return { characters, handleKeyDown, handleChange, inputRefs };
};

export default useOTP;
