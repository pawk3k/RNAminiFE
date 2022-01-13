// noinspection TypeScriptExplicitMemberType,JSUnusedGlobalSymbols

import {ParamDefinition as PD} from "molstar/lib/mol-util/param-definition";
import {Representation, RepresentationContext, RepresentationParamsGetter} from "molstar/lib/mol-repr/representation";
import {Vec3} from "molstar/lib/mol-math/linear-algebra/3d";
import {MeshBuilder} from "molstar/lib/mol-geo/geometry/mesh/mesh-builder";
import {RuntimeContext} from "molstar/lib/mol-task";
import {addSphere} from "molstar/lib/mol-geo/geometry/mesh/builder/sphere";
import {addCylinder} from "molstar/lib/mol-geo/geometry/mesh/builder/cylinder";
import {ShapeRepresentation} from "molstar/lib/mol-repr/shape/representation";
import {Color} from "molstar/lib/mol-util/color/color";
import {Mesh} from "molstar/lib/mol-geo/geometry/mesh/mesh";
import {Shape} from "molstar/lib/mol-model/shape/shape";
import {DefaultCylinderProps} from "molstar/lib/mol-geo/primitive/cylinder";

function getStructuralElementColor(order: number, parentEntanglements: number[]) {
    const rgbColors: number[][] = [[191, 255, 0], [0, 114, 0], [5, 32, 96], [143, 0, 0], [93, 0, 93], [60, 115, 157], [143, 118, 0], [210, 95, 210], [159, 185, 37]];
    return Color.fromRgb(rgbColors[order][0], rgbColors[order][1], rgbColors[order][2]);
}

//Intersection points representation

interface IntersectionPointData {
    intersectionPointLabel: string,
    coords: Vec3,
    radius: number
}

export const IntersectionPointParams = {
    ...Mesh.Params
}
export type IntersectionPointParams = typeof IntersectionPointParams;
export type IntersectionPointProps = PD.Values<IntersectionPointParams>

const IntersectionPointVisuals = {
    'mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<IntersectionPointData, IntersectionPointParams>) => ShapeRepresentation(getIntersectionPointShape, Mesh.Utils)
}

function getIntersectionPointMesh(data: IntersectionPointData, props: IntersectionPointProps, mesh?: Mesh) {
    const state = MeshBuilder.createState(256, 128, mesh);
    addSphere(state, data.coords, data.radius, 2)
    return MeshBuilder.getMesh(state);
}

function getIntersectionPointShape(ctx: RuntimeContext, data: IntersectionPointData, props: IntersectionPointProps, shape?: Shape<Mesh>) {
    const geo = getIntersectionPointMesh(data, props, shape && shape.geometry);
    const label = data.intersectionPointLabel;
    return Shape.create(label, data, geo, () => Color.fromRgb(255, 0, 0), () => data.radius, () => label + ` (${data.coords.map(n => n.toFixed(3)).join(", ")})`)
}

export type IntersectionPointRepresentation = Representation<IntersectionPointData, IntersectionPointParams>

export function IntersectionPointRepresentation(ctx: RepresentationContext, getParams: RepresentationParamsGetter<IntersectionPointData, IntersectionPointParams>): IntersectionPointRepresentation {
    return Representation.createMulti('Intersection point', ctx, getParams, Representation.StateBuilder, IntersectionPointVisuals as unknown as Representation.Def<IntersectionPointData, IntersectionPointParams>)
}

// Surface representation

interface InteriorData {
    interiorLabel: string,
    structType: string,
    structOrder: number,
    parentEntanglements: number[],
    structId: number,
    vertices: number[]
}

export const InteriorParams = {
    ...Mesh.Params,
    doubleSided: PD.Boolean(true),
    alpha: PD.Numeric(0.30),
}
export type InteriorParams = typeof InteriorParams;
export type InteriorProps = PD.Values<InteriorParams>

const InteriorVisuals = {
    'mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<InteriorData, InteriorParams>) => ShapeRepresentation(getInteriorShape, Mesh.Utils)
}

function getInteriorMesh(data: InteriorData, props: InteriorProps, mesh?: Mesh) {
    const state = MeshBuilder.createState(4096, 2048, mesh);
    state.currentGroup = 0;
    for (let i = 0; i < data.vertices.length-8; i+=9) {
        MeshBuilder.addTriangle(state,
            Vec3.create(data.vertices[i], data.vertices[i+1], data.vertices[i+2]),
            Vec3.create(data.vertices[i+3], data.vertices[i+4], data.vertices[i+5]),
            Vec3.create(data.vertices[i+6], data.vertices[i+7], data.vertices[i+8]),
        );
        MeshBuilder.addTriangle(state,
            Vec3.create(data.vertices[i], data.vertices[i+1], data.vertices[i+2]),
            Vec3.create(data.vertices[i+6], data.vertices[i+7], data.vertices[i+8]),
            Vec3.create(data.vertices[i+3], data.vertices[i+4], data.vertices[i+5]),
        );
    }
    return MeshBuilder.getMesh(state);
}

function getInteriorShape(ctx: RuntimeContext, data: InteriorData, props: InteriorProps, shape?: Shape<Mesh>) {
    const geo = getInteriorMesh(data, props, shape && shape.geometry);
    const label = data.interiorLabel;
    const parentEntanglementsString = `(in ` + data.parentEntanglements.map(no => `E${no + 1}`).join(", ") + ')';
    return Shape.create(label, data, geo, () => getStructuralElementColor(data.structOrder, data.parentEntanglements), () => 1, () => `${label} ${parentEntanglementsString} - inner area`)
}

export type InteriorRepresentation = Representation<InteriorData, InteriorParams>

export function InteriorRepresentation(ctx: RepresentationContext, getParams: RepresentationParamsGetter<InteriorData, InteriorParams>): InteriorRepresentation {
    return Representation.createMulti('Interior', ctx, getParams, Representation.StateBuilder, InteriorVisuals as unknown as Representation.Def<InteriorData, InteriorParams>)
}

// Tubes representation

interface EdgeData {
    edgeLabel: string,
    structType: string,
    structOrder: number,
    parentEntanglements: number[],
    structId: number,
    vertices: number[]
}

export const EdgeParams = {
    ...Mesh.Params
}
export type EdgeParams = typeof EdgeParams;
export type EdgeProps = PD.Values<EdgeParams>

const EdgeVisuals = {
    'mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<EdgeData, EdgeParams>) => ShapeRepresentation(getEdgeShape, Mesh.Utils)
}


function getEdgeMesh(data: EdgeData, props: EdgeProps, mesh?: Mesh) {
    const builderState = MeshBuilder.createState(2048, 1024, mesh);
    builderState.currentGroup = 0;

    for (let i = 0; i < data.vertices.length - 6; i+=3) {
        addSphere(builderState,
            Vec3.create(
                data.vertices[i],
                data.vertices[i+1],
                data.vertices[i+2]
            ), 0.5, 3)
        addCylinder(builderState,
            Vec3.create(
                data.vertices[i],
                data.vertices[i+1],
                data.vertices[i+2]
            ),
            Vec3.create(
                data.vertices[i+3],
                data.vertices[i+4],
                data.vertices[i+5]
            ),
            1,
            { ...DefaultCylinderProps, radiusTop: 0.5, radiusBottom: 0.5}
        )
    }
    return MeshBuilder.getMesh(builderState);
}

function getEdgeShape(ctx: RuntimeContext, data: EdgeData, props: EdgeProps, shape?: Shape<Mesh>) {
    const geo = getEdgeMesh(data, props, shape && shape.geometry);
    const label = data.edgeLabel;
    const parentEntanglementsString = `(in ` + data.parentEntanglements.map(no => `E${no + 1}`).join(", ") + ")";
    return Shape.create(label, data, geo, () => getStructuralElementColor(data.structOrder, data.parentEntanglements), () => 1, () => `${label} ${parentEntanglementsString}`)
}

export type EdgeRepresentation = Representation<EdgeData, EdgeParams>

export function EdgeRepresentation(ctx: RepresentationContext, getParams: RepresentationParamsGetter<EdgeData, EdgeParams>): EdgeRepresentation {
    return Representation.createMulti('Edge', ctx, getParams, Representation.StateBuilder, EdgeVisuals as unknown as Representation.Def<EdgeData, EdgeParams>)
}