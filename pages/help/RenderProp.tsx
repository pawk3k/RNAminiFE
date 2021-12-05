import { Dispatch, FunctionComponent, ReactNode, SetStateAction, useState } from 'react';

type RenderProps = {
  children: ({
    state,
    setState,
  }: {
    state: number;
    setState: Dispatch<SetStateAction<number>>;
  }) => JSX.Element;
};

export const RenderProp: FunctionComponent<RenderProps> = ({ children }) => {
  const [state, setState] = useState(0);
  console.log(children);
  //   return null;
  return children({ state, setState });
};
