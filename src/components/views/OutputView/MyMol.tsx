import { DefaultPluginUISpec, PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { createPluginAsync } from 'molstar/lib/mol-plugin-ui/index';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PluginLayoutControlsDisplay } from 'molstar/lib/mol-plugin/layout';
import { MolstarWrapper } from './viewer-3d/MolstarWrapper';
import { ColorNames } from 'molstar/lib/mol-util/color/names';

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

  const handleReadAllFiles = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    const files = e.target.files;
    files &&
      // @ts-ignore
      Object.keys(files as FileList).forEach((i: number) => {
        console.log(i);
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          if (i == 0) {
            setFile1(text);
          } else {
            setFile2(text);
          }
        };
        reader.readAsText(file);
      });
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
        await molstarPlugin.loadStructureFromData(file1, 'pdb', {
          myColor: ColorNames.green,
        });
        await molstarPlugin.loadStructureFromData(file2, 'pdb', { myColor: ColorNames.red });
      }
    }
    initViewer3d();
  }, [file1, file2]);
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
