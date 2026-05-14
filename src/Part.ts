import { Mesh, Object3D } from "three";
import { IPart } from "./Interfaces";

export default class Part {
    private name: string;
    private readonly meshes: Mesh[] = [];

    public constructor(chairModel: Object3D, part: IPart) {
        this.name = part.name;
        for (const partMesh of part.meshes){
            const correspondingMesh: Mesh | undefined = chairModel.children.find((modelMesh) => modelMesh.name === partMesh.name) as Mesh | undefined;
            if (!correspondingMesh) continue;
            this.meshes.push(correspondingMesh);
        }
    }

    public getName(): string {
        return this.name;
    }

    public getMeshes(): Mesh[] {
        return this.meshes;
    }

    public setVisible(visible: boolean): void {
        this.meshes.forEach(mesh => {
            mesh.visible = visible;
        });
    }

}