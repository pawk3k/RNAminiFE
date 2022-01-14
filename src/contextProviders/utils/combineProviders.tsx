import React, { ComponentProps, FC } from 'react';

// combine react context providers with typescript

const combineComponents = (...components: FC[]): FC =>
  components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      ({ children }: ComponentProps<FC>): JSX.Element =>
        (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        ),
    // eslint-disable-next-line react/jsx-no-useless-fragment
    ({ children }) => <>{children}</>,
  );

export default combineComponents;
