import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ColorNames } from 'molstar/lib/mol-util/color/names';
import { MolstarWrapper } from './MolstarWrapper';

const Molstar: FunctionComponent<{ inputFile1: string; inputFile2: string }> = ({
  inputFile1,
  inputFile2,
}) => {
  const parent = useRef<HTMLDivElement>(null);
  const [molstarPlugin, setMolstarPlugin] = useState<MolstarWrapper | undefined>();

  const [file1, setFile1] = useState<string>();
  const [file2, setFile2] = useState<string>();

  const handleReadAllFiles = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    const { files } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    files &&
      Object.keys(files as FileList).forEach((i: string) => {
        const file = files[+i];
        const reader = new FileReader();
        reader.onload = (event): void => {
          const text = event.target?.result as string;
          if (i === '0') {
            setFile1(text);
          } else {
            setFile2(text);
          }
        };
        reader.readAsText(file);
      });
  };

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
  }, [file1, file2, inputFile1, inputFile2, molstarPlugin]);

  return (
    <div>
      <div id="viewer3d-molstar" className="w-96 h-96 -ml-3">
        <div id="structure-3d-viewer" ref={parent} />
      </div>
      <input type="file" onChange={handleReadAllFiles} multiple />
    </div>
  );
};

export default Molstar;
