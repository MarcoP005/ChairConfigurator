export interface ChairConfig {
    modelFile: string;
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
    inner: string[],
    outer: string[]
}