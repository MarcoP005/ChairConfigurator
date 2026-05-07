export interface ChairConfig {
    modelFile: string;
    components: Components;
    others: Part[];
}

export interface Components {
    leg: Part[];
    seat: Part[];
    back: Part[];
    arm: Part[];
}

export interface Part {
    name: string;
    meshes: string[];
}