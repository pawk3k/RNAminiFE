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
    <div id="viewer3d-molstar" className="mx-auto h-full">
      <div id="structure-3d-viewer rounded-xl" ref={parent} />
    </div>
  );
};

export default Molstar;
