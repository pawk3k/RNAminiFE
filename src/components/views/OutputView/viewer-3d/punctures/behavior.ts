import {PluginStateObject} from "molstar/lib/mol-plugin-state/objects";
import {PluginContext} from "molstar/lib/mol-plugin/context";
import {ParamDefinition as PD} from "molstar/lib/mol-util/param-definition";
import {Vec3} from "molstar/lib/mol-math/linear-algebra/3d";
import {StateTransformer} from "molstar/lib/mol-state/transformer";
import {Task} from "molstar/lib/mol-task";

import {
    IntersectionPointRepresentation,
    IntersectionPointParams,
    InteriorRepresentation,
    InteriorParams,
    EdgeRepresentation,
    EdgeParams
} from "./representation";


const CreateTransformer = StateTransformer.builderFactory('rna-namespace');

export const CreateIntersectionPoint = CreateTransformer({
    name: 'create-intersection-point',
    display: 'Intersection points',
    from: PluginStateObject.Root, // or whatever data source
    to: PluginStateObject.Shape.Representation3D,
    params: {
        intersectionPointLabel: PD.Value('Unknown'),
        punctureId: PD.Value(0),
        coords: PD.Value(Vec3()),
        radius: PD.Value(1.6)
    }
})({
    canAutoUpdate() {
        return true;
    },
    apply({a, params}, plugin: PluginContext) {
        return Task.create('Intersection point', async ctx => {
            const repr = IntersectionPointRepresentation({webgl: plugin.canvas3d?.webgl, ...plugin.representation.structure.themes}, () => IntersectionPointParams);
            await repr.createOrUpdate({}, params).runInContext(ctx);
            return new PluginStateObject.Shape.Representation3D({repr, sourceData: a.data}, {label: params.intersectionPointLabel});
        });
    }
});

export const CreateInterior = CreateTransformer({
    name: 'create-interior',
    display: 'Interior',
    from: PluginStateObject.Root, // or whatever data source
    to: PluginStateObject.Shape.Representation3D,
    params: {
        interiorLabel: PD.Value('Unknown'),
        structType: PD.Value('Unknown'),
        structOrder: PD.Value(0),
        parentEntanglements: PD.Value([] as number[]),
        structId: PD.Value(0),
        vertices: PD.Value([] as number[])
    }
})({
    canAutoUpdate({oldParams, newParams}) {
        return true;
    },
    apply({a, params}, plugin: PluginContext) {
        return Task.create('Interiors', async ctx => {
            const repr = InteriorRepresentation({webgl: plugin.canvas3d?.webgl, ...plugin.representation.structure.themes}, () => InteriorParams);
            await repr.createOrUpdate({}, params).runInContext(ctx);
            return new PluginStateObject.Shape.Representation3D({repr, sourceData: a.data}, {label: params.interiorLabel});
        });
    }
});

export const CreateEdge = CreateTransformer({
    name: 'create-edge',
    display: 'Edge',
    from: PluginStateObject.Root, // or whatever data source
    to: PluginStateObject.Shape.Representation3D,
    params: {
        edgeLabel: PD.Value('Default edge'),
        structType: PD.Value('unknown'),
        structOrder: PD.Value(0),
        parentEntanglements: PD.Value([] as number[]),
        structId: PD.Value(0),
        vertices: PD.Value([] as number[])
    }
})({
    canAutoUpdate({oldParams, newParams}) {
        return true;
    },
    apply({a, params}, plugin: PluginContext) {
        return Task.create('Edge', async ctx => {
            const repr = EdgeRepresentation({webgl: plugin.canvas3d?.webgl, ...plugin.representation.structure.themes}, () => EdgeParams);
            await repr.createOrUpdate({}, params).runInContext(ctx);
            return new PluginStateObject.Shape.Representation3D({repr, sourceData: a.data}, {label: params.edgeLabel});
        });
    }
});
