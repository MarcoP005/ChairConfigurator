import { Mesh, MeshPhysicalMaterial } from "three";
import Chair from "./Chair";
import { chairConfig, files } from "./ChairConfig";
import { MaterialType } from "./Enums";
import Utility from "./Utility";
import { IMesh, IPart } from "./Interfaces";
import Part from "./Part";

export default class MatPicker {
    private chair: Chair;

    private softMats: MeshPhysicalMaterial[] = [];
    private hardMats: MeshPhysicalMaterial[] = [];
    private otherMats: MeshPhysicalMaterial[] = [];

    private softMeshes: Mesh[] = [];
    private hardMeshes: Mesh[] = [];
    private otherMeshes: Mesh[] = [];

    public constructor(chair: Chair) {
        this.chair = chair;
        this.mapMaterials();

        this.mapParts(chair.getLegs(), chairConfig.components.legs);
        this.mapParts(chair.getSeats(), chairConfig.components.seats);
        this.mapParts(chair.getBacks(), chairConfig.components.backs);
        this.mapParts(chair.getArms(), chairConfig.components.arms);
        this.mapParts(chair.getFixed(), chairConfig.fixed);

        console.log("SoftMeshes", this.softMeshes);
        console.log("HardMeshes", this.hardMeshes);
        console.log("OtherMeshes", this.otherMeshes);
    }

    private async mapMaterials(): Promise<void> {
        for (const matFile of files.softMaterials) {
            const cube: Mesh = (await Utility.loadModel("materials/" + matFile)).children[0] as Mesh;
            this.softMats.push(cube.material as MeshPhysicalMaterial);
        }
        for (const matFile of files.hardMaterials) {
            const cube: Mesh = (await Utility.loadModel("materials/" + matFile)).children[0] as Mesh;
            this.hardMats.push(cube.material as MeshPhysicalMaterial);
        }
        for (const matFile of files.otherMaterials) {
            const cube: Mesh = (await Utility.loadModel("materials/" + matFile)).children[0] as Mesh;
            this.otherMats.push(cube.material as MeshPhysicalMaterial);
        }
    }

    private mapParts(parts: Part[], iParts: IPart[]) {
        iParts.forEach(ipart => {
            const p: Part | undefined = parts.find((part) => part.getName() === ipart.name);
            if (p) this.mapMeshes(p.getMeshes(), ipart.meshes);
        });
    }

    private mapMeshes(meshes: Mesh[], iMeshes: IMesh[]): void {
        iMeshes.forEach(imesh => {
            const m: Mesh | undefined = meshes.find((mesh) => mesh.name === imesh.name);
            if (m) {
                if (imesh.materials === MaterialType.Soft)
                    this.softMeshes.push(m);
                else if (imesh.materials === MaterialType.Hard)
                    this.hardMeshes.push(m);
                else if (imesh.materials === MaterialType.Other)
                    this.otherMeshes.push(m);
            }
        });
    }

    public setMaterial(matType: MaterialType, matIndex: number): void {
        switch (matType) {
            case MaterialType.Soft:
                this.changeMat(this.softMeshes, this.softMats, matIndex);
                break;
            case MaterialType.Hard:
                this.changeMat(this.hardMeshes, this.hardMats, matIndex);
                break;
            case MaterialType.Other:
                this.changeMat(this.otherMeshes, this.otherMats, matIndex);
                break;
        }
    }

    private changeMat(meshesToChange: Mesh[], mats: MeshPhysicalMaterial[], index: number) {
        meshesToChange.forEach(mesh => {
            mesh.material = mats[index];
        });
    }
}