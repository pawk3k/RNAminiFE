import { DefaultPluginUISpec, PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { createPluginAsync } from 'molstar/lib/mol-plugin-ui/index';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { createRef, useEffect, useRef } from 'react';
import { createReadStream } from 'fs';
import { CLIENT_RENEG_LIMIT } from 'tls';

const MySpec: PluginUISpec = {
  ...DefaultPluginUISpec(),
  config: [[PluginConfig.VolumeStreaming.Enabled, false]],
};

async function createPlugin(parent: HTMLElement) {
  const plugin = await createPluginAsync(parent, MySpec);

  const data = await plugin.builders.data.download({ url: '...' }, { state: { isGhost: true } });
  //   @ts-ignore
  const trajectory = await plugin.builders.structure.parseTrajectory(data, format);
  //   @ts-ignore
  await this.plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');

  return plugin;
}

function MolStarWrapper() {
  const parent = createRef<HTMLDivElement>();
  console.log(parent);
  useEffect(() => {
    let plugin: any | undefined = undefined;
    async function init() {
      //   @ts-ignore
      plugin = createPlugin(parent.current);
    }
    if (parent.current) {
      console.log(parent.current);
    }
    init();
    return () => {
      plugin?.dispose();
    };
  }, []);

  return <div ref={parent} style={{ width: 640, height: 480, position: 'absolute' }} />;
}

export default MolStarWrapper;
