import { FunctionComponent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ColorNames } from 'molstar/lib/mol-util/color/names';
import { MolstarWrapper } from './MolstarWrapper';

const Molstar: FunctionComponent<{ inputFile1: string; inputFile2: string }> = ({
  inputFile1,
  inputFile2,
}) => {
  const parent = useRef<HTMLDivElement>(null);
  const [molstarPlugin, setMolstarPlugin] = useState<MolstarWrapper | undefined>();

  useLayoutEffect(() => {
    if (parent.current) {
      setMolstarPlugin(new MolstarWrapper(parent.current));
    }
  }, []);

  useEffect(() => {
    async function initViewer3d(): Promise<void> {
      if (inputFile1 && inputFile2 && molstarPlugin) {
        await molstarPlugin.loadStructureFromData(atob(inputFile1), 'pdb', {
          myColor: ColorNames.green,
        });
        await molstarPlugin.loadStructureFromData(atob(inputFile2), 'pdb', {
          myColor: ColorNames.red,
        });
      }
    }
    initViewer3d();
  }, [inputFile1, inputFile2, molstarPlugin]);

  return (
    <div>
      <div id="viewer3d-molstar" className="w-96 h-96 -ml-3">
        <div id="structure-3d-viewer" ref={parent} />
      </div>
    </div>
  );
};

export default Molstar;
