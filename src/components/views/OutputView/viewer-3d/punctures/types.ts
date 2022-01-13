import {Vec3} from "molstar/lib/mol-math/linear-algebra/3d";

export namespace RNAspiderTypes {

    export type Puncture = {
        id: number,
        point: Vec3,
        surface: Float32Array,
        strandTrace: Float32Array,
        surfaceMesh: Float32Array
    }

    export type Entanglement = {
        type: string,
        punctures: Array<Puncture>
    }

    export interface PuncturePointsRaw {
        id: number,
        point: number[],
        atoms: string[]
    }

    export interface StructureRaw {
        no: number,
        id: number,
        type: string,
        entanglements: number[],
        sequence: string[],
        structure: string[],
    }

    export interface EntanglementRaw {
        type: string;
        order: number,
        punctures: Array<PuncturePointsRaw>;
        structuresIndices: number[];
    }


    export type RNAspiderReportRaw = {
        entanglements: Array<EntanglementRaw>,
        structures: Array<StructureRaw>
        meshes : {
            [key: string] : number[]
        }
    }
}
