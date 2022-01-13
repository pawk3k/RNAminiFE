import { DefaultPluginUISpec, PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { createPluginAsync } from 'molstar/lib/mol-plugin-ui/index';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { ChangeEvent, createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PluginLayoutControlsDisplay } from 'molstar/lib/mol-plugin/layout';
import { createReadStream, read } from 'fs';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { MolstarWrapper } from './viewer-3d/MolstarWrapper';

const DefaultViewerOptions = {
  layoutIsExpanded: false,
  layoutShowControls: false,
  layoutShowRemoteState: false,
  layoutShowSequence: false,
  layoutShowLeftPanel: true,
  layoutControlsDisplay: 'reactive' as PluginLayoutControlsDisplay,

  viewportShowExpand: true,
  viewportShowSelectionMode: false,
  viewportShowAnimation: false,
};

type ViewerOptions = typeof DefaultViewerOptions;

const o = { ...DefaultViewerOptions };
const defaultSpec = DefaultPluginUISpec();
const spec: PluginUISpec = {
  actions: defaultSpec.actions,
  behaviors: [...defaultSpec.behaviors],
  animations: [...(defaultSpec.animations || [])],
  customParamEditors: defaultSpec.customParamEditors,
  layout: {
    initial: {
      isExpanded: o.layoutIsExpanded,
      showControls: o.layoutShowControls,
      controlsDisplay: o.layoutControlsDisplay,
      regionState: {
        right: 'hidden',
        bottom: 'hidden',
        top: o.layoutShowSequence ? 'full' : 'hidden',
        left: o.layoutShowLeftPanel ? 'full' : 'hidden',
      },
    },
  },
  components: {
    ...defaultSpec.components,
    remoteState: 'none',
    viewport: {},
  },
  config: [
    [PluginConfig.Viewport.ShowExpand, o.viewportShowExpand],
    [PluginConfig.Viewport.ShowAnimation, o.viewportShowAnimation],
    [PluginConfig.Viewport.ShowSelectionMode, o.viewportShowSelectionMode],
  ],
};

async function createPlugin(parent: HTMLElement) {
  const plugin = await createPluginAsync(parent, spec);

  const data = await plugin.builders.data.download({ url: '...' }, { state: { isGhost: true } });
  //   @ts-ignore
  await this.plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');

  return plugin;
}

function MolStarMy() {
  const parent = useRef<HTMLDivElement>(null);
  const [molstarPlugin, setMolstarPlugin] = useState<MolstarWrapper | undefined>();

  const [file1, setFile1] = useState<string>();
  const [file2, setFile2] = useState<string>();

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = async (event): Promise<void> => {
      const text = event.target?.result as string;
      // setFile1([text, text]);
      // setFile((prevFile) => [...(prevFile || []), text]);
    };
    console.log(files);
    // files.forEach((file) => {
    //   reader.readAsText(file);
    // });
    reader.readAsText(e.target.files![0]);
    // read file after file

    // reader.readAsText(e.target.files![1]);
  };

  const handleReadAllFiles = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    files &&
      // @ts-ignore
      Object.keys(files as FileList).forEach((i: number) => {
        console.log(i);
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          // setFile1(text);
          if (i == 0) {
            setFile1(text);
          } else {
            setFile2(text);
          }
          //server call for uploading or reading the files one-by-one
          //by using 'reader.result' or 'file'
        };
        reader.readAsText(file);
      });

    // read multiple files with reader
  };
  console.log(file1);

  useLayoutEffect(() => {
    if (parent.current) {
      setMolstarPlugin(new MolstarWrapper(parent.current));
    }
  }, []);

  useEffect(() => {
    async function initViewer3d() {
      if (file2 && file1 && molstarPlugin) {
        await molstarPlugin.loadStructureFromData(file1, 'pdb');
        await molstarPlugin.loadStructureFromData(file2, 'pdb');
      }
    }
    initViewer3d();
  }, [file1, file2]);
  console.log(file1?.length);
  console.log(file2?.length);
  // console.log(file[1]?.length);
  // useEffect(() => {
  //   let plugin: any | undefined = undefined;
  //   async function init() {
  //     //   @ts-ignore
  //     plugin = createPlugin(parent.current);
  //   }
  //   if (parent.current) {
  //     console.log(parent.current);
  //   }
  //   init();
  //   return () => {
  //     plugin?.dispose();
  //   };
  // }, []);

  return (
    <div>
      <div id="viewer3d-molstar" className="w-96 h-96">
        <div id="structure-3d-viewer" ref={parent} />
      </div>
      <input type="file" onChange={handleReadAllFiles} multiple />
    </div>
  );
}

export default MolStarMy;
