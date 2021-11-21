import { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import React from 'react';
// @ts-ignore
const Molstar = dynamic(() => import('molstar-react'), {
  ssr: false,
});

const Output: FunctionComponent = () => {
  return (
    <div>
      <div className="bg-blue text-blue">Here you can see your output: </div>
      <div className="ml-10 mt-40">
        <Molstar
          pdbId="1a0a"
          url="https://files.rcsb.org/download/1a0a.pdb"
          dimensions={[500, 500]}
          options={{
            layoutShowControls: false,
            'hide-controls': 1,
          }}
        />
      </div>
    </div>
  );
};

export default Output;
