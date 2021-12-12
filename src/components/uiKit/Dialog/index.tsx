import { DialogContent, DialogOverlay } from '@reach/dialog';
import React, { FunctionComponent } from 'react';

const Dialog: FunctionComponent<{ isOpen: boolean; onDismiss: () => void }> = ({
  isOpen,
  onDismiss,
  children,
}) => (
  <DialogOverlay isOpen={isOpen}>
    <DialogContent className="m-0 p-0 w-full h-full md:mx-auto md:w-1/2 md:relative md:h-1/2 md:mt-32 md:rounded flex justify-center items-center">
      {/* <DialogContent className="w-full h-full flex max-w-md rounded-2xl absolute top-1/4 left-1/4 mx-auto ring-blue ring-4 flex-col items-center justify-center my-auto"> */}
      <button type="button" className="self-start absolute right-10 top-10" onClick={onDismiss}>
        x
      </button>
      <div>
        <div>{children}</div>
      </div>
    </DialogContent>
  </DialogOverlay>
);
export default Dialog;
