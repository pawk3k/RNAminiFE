import React, { FunctionComponent } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: FunctionComponent = () => {
  const notify = (): React.ReactText => toast('Wow so easy!');

  return (
    <div>
      <button type="button" onClick={notify}>
        Notify!
      </button>
      <ToastContainer />
    </div>
  );
};
export default Toast;
