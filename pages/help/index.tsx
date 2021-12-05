import { Dispatch, FunctionComponent, useEffect, SetStateAction } from 'react';
import { RenderProp } from './RenderProp';

const Help: FunctionComponent = () => {
  return (
    <div>
      <RenderProp>
        {({ state, setState }) => (
          <h1>
            {state}I am being <button onClick={() => setState(state + 1)}>ok</button> rendered by
            Renderer
          </h1>
        )}
      </RenderProp>
    </div>
  );
};

export default Help;
