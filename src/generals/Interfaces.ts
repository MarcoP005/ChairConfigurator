import { MaterialType } from "./Enums";

export interface IChairConfig {
    components: IComponents;
    fixed: IPart[];
}

export interface IComponents {
    legs: IPart[];
    seats: IPart[];
    backs: IPart[];
    arms: IPart[];
}

export interface IPart {
    name: string;
    meshes: IMesh[];
}

export interface IMesh {
    name: string;
    materials: MaterialType;
}

export interface IFiles {
    chairModel: string;
    softMaterials: string[];
    hardMaterials: string[];
    otherMaterials: string[];
}