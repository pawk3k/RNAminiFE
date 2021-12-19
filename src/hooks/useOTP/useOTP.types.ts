export type UseOTPReturnType = {
  characters: string[];
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (index: number, value: string) => void;
  inputRefs: React.RefObject<HTMLInputElement>[];
};
