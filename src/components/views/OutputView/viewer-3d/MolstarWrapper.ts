import { createPlugin } from 'molstar/lib/mol-plugin-ui';
import { DefaultPluginUISpec, PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { PluginContext } from 'molstar/lib/mol-plugin/context';
import { PluginLayoutControlsDisplay } from 'molstar/lib/mol-plugin/layout';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory';
import { Vec3 } from 'molstar/lib/mol-math/linear-algebra/3d';
import { createStructureRepresentationParams } from 'molstar/lib/mol-plugin-state/helpers/structure-representation-params';
import { StateTransforms } from 'molstar/lib/mol-plugin-state/transforms';
import { applyBuiltInSelection } from 'molstar/lib/mol-plugin-state/helpers/structure-selection-query';
import { PluginCommands } from 'molstar/lib/mol-plugin/commands';
import { Color } from 'molstar/lib/mol-util/color/color';
import { setSubtreeVisibility } from 'molstar/lib/mol-plugin/behavior/static/state';

import { RNAspiderTypes as RST } from './punctures/types';
import { CreateEdge, CreateIntersectionPoint, CreateInterior } from './punctures/behavior';
import { ColorNames } from 'molstar/lib/mol-util/color/names';

// require('molstar/lib/mol-plugin-ui/skin/light.scss');

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

export class MolstarWrapper {
  plugin: PluginContext;
  private entanglementsRefs: string[] = [];
  private modelRef: string = '';

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
    this.plugin = createPlugin(element, spec);
  }

  switchControls(showControls: boolean) {
    PluginCommands.Layout.Update(this.plugin, { state: { showControls: showControls } });
  }

  selectEntanglement(entanglementIndex: number) {
    if (entanglementIndex === -1) {
      this.entanglementsRefs.forEach((entanglementRef) => {
        setSubtreeVisibility(this.plugin.state.data, entanglementRef, false);
      });
    } else {
      this.entanglementsRefs.forEach((entanglementRef, i) => {
        const hide = entanglementIndex !== i;
        setSubtreeVisibility(this.plugin.state.data, entanglementRef, hide);
      });
    }
  }

  async loadStructureFromData(
    data_string: string,
    format: BuiltInTrajectoryFormat,
    options?: { dataLabel?: string },
  ) {
    await this.plugin.clear();
    this.plugin.canvas3d?.setProps((old) => {
      old.renderer.pickingAlphaThreshold = 0.2;
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
    this.modelRef = model.ref;
    const structure = await structureBuilder.createStructure(model);
    const components = this.plugin.build().to(structure);
    const traceRepr = createStructureRepresentationParams(this.plugin, void 0, {
      type: 'ball-and-stick',
      color: 'uniform',
      colorParams: { value: ColorNames.grey },
      size: 'uniform',
      sizeParams: { value: 2.0 },
    });
    await applyBuiltInSelection(components, 'backbone')
      .apply(StateTransforms.Representation.StructureRepresentation3D, traceRepr)
      .commit();
  }

  hashPuncture(puncture: RST.PuncturePointsRaw) {
    return puncture.atoms[0] + ';' + puncture.atoms[1];
  }

  async loadPunctures(report: RST.RNAspiderReportRaw) {
    const structureMap: any = {
      L: 'Loop',
      D: 'Dinucleotide step',
      S: 'Single strand',
    };
    if (
      !report ||
      !report.entanglements ||
      !report.entanglements.length ||
      !report.structures ||
      !report.structures.length
    )
      return;
    const structure = this.plugin.build().to(this.modelRef);
    const entanglementsGroupRef = await structure
      .apply(StateTransforms.Misc.CreateGroup, { label: 'Entanglements' })
      .commit();

    let punctureHashes: string[] = [];

    //@ts-ignore
    for (const [i, entanglement] of report.entanglements.entries()) {
      const entanglementsGroupBuilder = this.plugin.build().to(entanglementsGroupRef);
      const entanglementElement = entanglementsGroupBuilder.apply(
        StateTransforms.Misc.CreateGroup,
        { label: `Entanglement ${entanglement.type} ${i + 1}` },
      );
      for (const puncture of entanglement.punctures) {
        const punctureHash = this.hashPuncture(puncture);
        let punctureId = punctureHashes.findIndex((hash) => {
          return hash === punctureHash;
        });
        if (punctureId === -1) {
          punctureHashes.push(punctureHash);
          punctureId = punctureHashes.length - 1;
        }
        await entanglementElement.apply(CreateIntersectionPoint, {
          intersectionPointLabel: `Intersection point ${punctureId + 1}`,
          punctureId: punctureId + 1,
          coords: Vec3.create(puncture.point[0], puncture.point[1], puncture.point[2]),
        });
      }
      for (const structureIndex of entanglement.structuresIndices) {
        const structure = report.structures[structureIndex];
        const edgeVertices =
          report.meshes[`E${structure.type}_${entanglement.order}_${structure.no}`];
        const elementRef = await entanglementElement.apply(CreateEdge, {
          edgeLabel: `${structureMap[structure.type]} ${structure.id}`,
          structType: structure.type,
          structOrder: entanglement.order,
          parentEntanglements: structure.entanglements,
          vertices: edgeVertices,
        });

        if (structure.type !== 'S') {
          const sheetVertices =
            report.meshes[`S${structure.type}_${entanglement.order}_${structure.no}`];
          elementRef.apply(CreateInterior, {
            interiorLabel: `${structureMap[structure.type]} ${structure.id}`,
            structType: structure.type,
            structOrder: entanglement.order,
            parentEntanglements: structure.entanglements,
            vertices: sheetVertices,
          });
        }
      }
      const entanglementRef = await entanglementElement.commit();
      this.entanglementsRefs.push(entanglementRef.ref);
    }
  }
}
