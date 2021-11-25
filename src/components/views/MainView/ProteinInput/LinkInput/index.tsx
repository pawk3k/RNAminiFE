import React, { FunctionComponent } from 'react';
import SingleCharInput from './SingleCharInput';

const LinkInput: FunctionComponent = () => (
  <div className="flex justify-center flex-col text-center">
    <div className="mb-6 mt-16" style={{ color: '#6100ff' }}>
      Enter PDB id
    </div>
    <div>
      <SingleCharInput />
      <SingleCharInput />
      <SingleCharInput />
      <SingleCharInput />
    </div>
  </div>
);

export default LinkInput;
