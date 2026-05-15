import { Material, Mesh, MeshPhysicalMaterial } from "three";
import Chair from "./Chair";
import { chairConfig, files } from "./ChairConfig";
import { MaterialType } from "./Enums";
import { IMesh, IPart } from "./Interfaces";
import Part from "./Part";
import Utility from "./Utility";

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

        this.setMaterial(MaterialType.Soft, 0);
        this.setMaterial(MaterialType.Hard, 0);
        this.setMaterial(MaterialType.Other, 0);

        this.mapParts(chair.getLegs(), chairConfig.components.legs);
        this.mapParts(chair.getSeats(), chairConfig.components.seats);
        this.mapParts(chair.getBacks(), chairConfig.components.backs);
        this.mapParts(chair.getArms(), chairConfig.components.arms);
        this.mapParts(chair.getFixed(), chairConfig.fixed);
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

    public async setMaterial(matType: MaterialType, matIndex: number): Promise<void> {
        console.log("ChangeMat - Start");
        let newMat: MeshPhysicalMaterial | undefined;
        switch (matType) {
            case MaterialType.Soft:
                newMat = ((await Utility.loadModel(`materials/${files.softMaterials[matIndex]}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.changeMat(this.softMeshes, newMat);
                break;
            case MaterialType.Hard:
                newMat = ((await Utility.loadModel(`materials/${files.hardMaterials[matIndex]}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.changeMat(this.hardMeshes, newMat);
                break;
            case MaterialType.Other:
                newMat = ((await Utility.loadModel(`materials/${files.otherMaterials[matIndex]}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.changeMat(this.otherMeshes, newMat);
                break;
        }
        console.log("ChangeMat - End");
    }

    private async changeMat(meshesToChange: Mesh[], material: MeshPhysicalMaterial) {
        for (const mesh of meshesToChange) {
            const mat: MeshPhysicalMaterial = material.clone();
            mat.aoMap = await Utility.loadTexture(`occlusions/SelfOcclusion_${mesh.name}.png`);
            mesh.material = mat;
        }
    }
}