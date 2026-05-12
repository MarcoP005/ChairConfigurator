export interface ChairConfig {
    modelFile: string; //es "chair.glb"
    components: Components;
    others: Part[];
    materialsFiles: MaterialsFiles;
}

export interface Components {
    legs: Part[];
    seats: Part[];
    backs: Part[];
    arms: Part[];
}

export interface Part {
    name: string;
    meshes: string[];
}

export interface MaterialsFiles {
    inner: string[], //es "Metal.glb"
    outer: string[]
}

export interface Mesh {

}