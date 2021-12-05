import { DialogContent, DialogOverlay } from '@reach/dialog';
import React, { FunctionComponent } from 'react';

const Dialog: FunctionComponent<{ isOpen: boolean; onDissmis: () => void }> = ({
  isOpen,
  onDissmis,
  children,
}) => {
  return (
    isOpen && (
      <DialogOverlay isOpen={isOpen}>
        <DialogContent className="flex  ring-blue ring-4 flex-col items-center justify-center">
          <button className="self-end mb-5" onClick={onDissmis}>
            x
          </button>
          <div>
            <div>{children}</div>
          </div>
        </DialogContent>
      </DialogOverlay>
    )
  );
};
export default Dialog;
