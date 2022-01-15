import { createPlugin } from 'molstar/lib/mol-plugin-ui';
import { DefaultPluginUISpec, PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { PluginContext } from 'molstar/lib/mol-plugin/context';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory';
import { createStructureRepresentationParams } from 'molstar/lib/mol-plugin-state/helpers/structure-representation-params';
import { StateTransforms } from 'molstar/lib/mol-plugin-state/transforms';
import { applyBuiltInSelection } from 'molstar/lib/mol-plugin-state/helpers/structure-selection-query';
import { Color } from 'molstar/lib/mol-util/color/color';

import { ColorNames } from 'molstar/lib/mol-util/color/names';

const DefaultViewerOptions = {
  layoutIsExpanded: false,
  layoutShowControls: false,
  layoutShowRemoteState: false,
  layoutShowSequence: false,
  layoutShowLeftPanel: true,
  viewportShowExpand: true,
  viewportShowSelectionMode: false,
  viewportShowAnimation: false,
};
type ViewerOptions = typeof DefaultViewerOptions;

// eslint-disable-next-line import/prefer-default-export
export class MolstarWrapper {
  plugin: PluginContext;

  constructor(element: HTMLElement, options: Partial<ViewerOptions> = {}) {
    const o = { ...DefaultViewerOptions, ...options };
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
    this.plugin = createPlugin(element, spec);
  }

  async loadStructureFromData(
    data_string: string,
    format: BuiltInTrajectoryFormat,
    options?: { dataLabel?: string; myColor: number },
  ): Promise<void> {
    this.plugin.canvas3d?.setProps((old) => {
      // eslint-disable-next-line no-param-reassign
      old.renderer.pickingAlphaThreshold = 0.2;
      // eslint-disable-next-line no-param-reassign
      old.renderer.backgroundColor = 0xffffff as Color;
    });
    this.plugin.behaviors.layout.leftPanelTabName.next('data');
    const data = await this.plugin.builders.data.rawData({
      data: data_string,
      label: options?.dataLabel,
    });
    const trajectory = await this.plugin.builders.structure.parseTrajectory(data, format);
    const structureBuilder = this.plugin.builders.structure;
    const model = await structureBuilder.createModel(trajectory);
    const structure = await structureBuilder.createStructure(model);
    const components = this.plugin.build().to(structure);
    const colorName = options?.myColor || ColorNames.green;
    const traceRepr = createStructureRepresentationParams(this.plugin, undefined, {
      type: 'carbohydrate',
      color: 'uniform',
      // @ts-ignore
      colorParams: { value: colorName! },
      size: 'uniform',
      sizeParams: { value: 2.0 },
    });
    await applyBuiltInSelection(components, 'all')
      .apply(StateTransforms.Representation.StructureRepresentation3D, traceRepr)
      .commit();
  }
}
