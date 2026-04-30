import { Mesh, Object3D } from "three";

export default class Part {
    private name: string;
    private meshes: Mesh[] = [];

    public constructor(chairModel: Object3D, part: { name: string, mesh: string[] }) {
        this.name = part.name;

        part.mesh.forEach(element => {
            const correspondingMesh: Object3D | undefined = chairModel.children.find((c) => c.name === element);
            if (correspondingMesh && correspondingMesh instanceof Mesh)
                this.meshes.push(correspondingMesh);
        });
    }

    public getName(): string {
        return this.name;
    }
    public getMeshes(): Mesh[] {
        return this.meshes;
    }

    public setVisible(visible: boolean): void {
        // TODO: ciclare meshes e settare la visibilità scritta sopra
        this.meshes.forEach(mesh => {
            mesh.visible = visible;
        });
    }

}