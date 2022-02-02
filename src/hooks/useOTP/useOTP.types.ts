export type UseOTPReturnType = {
  characters: string[];
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (index: number, value: string) => void;
  inputRefs: React.RefObject<HTMLInputElement>[];
  clear: () => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};
