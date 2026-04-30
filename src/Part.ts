import { Mesh, Object3D } from "three";

export default class Part {

    private chairModel: Object3D;
    private name: string;
    private meshes: Mesh[] = [];

    public constructor(chairModel: Object3D, data: { name: string, mesh: string[] }) {
        this.chairModel = chairModel;
        this.name = data.name;

        // console.log(data);

        data.mesh.forEach(element => {
            // console.log(element);
            const child: Object3D | undefined = this.chairModel.children.find((c) => c.name === element);
            if (child && child instanceof Mesh) {
                // console.log(child);
                this.meshes.push(child);
            }
        });
        console.log(this.meshes);
    }

    public getName(): string {
        return this.name;
    }

    // public getMeshes(): Mesh[] {
    //     return this.meshes;
    // }

}