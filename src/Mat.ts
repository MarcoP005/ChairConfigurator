import { Mesh, MeshPhysicalMaterial, Texture } from "three";
import Chair from "./Chair";
import { chairConfig, files } from "./ChairConfig";
import { MaterialType } from "./Enums";
import { IMesh, IPart } from "./Interfaces";
import Part from "./Part";
import Utility from "./Utility";

export default class Mat {
    private chair: Chair;

    private softMeshes: Mesh[] = [];
    private hardMeshes: Mesh[] = [];
    private otherMeshes: Mesh[] = [];

    public constructor(chair: Chair) {
        this.mapParts(chair.getLegs(), chairConfig.components.legs);
        this.mapParts(chair.getSeats(), chairConfig.components.seats);
        this.mapParts(chair.getBacks(), chairConfig.components.backs);
        this.mapParts(chair.getArms(), chairConfig.components.arms);
        this.mapParts(chair.getFixed(), chairConfig.fixed);

        this.setMaterial(MaterialType.Soft, 0);
        this.setMaterial(MaterialType.Hard, 0);
        this.setMaterial(MaterialType.Other, 0);
        this.chair = chair;
    }

    public async setMaterial(matType: MaterialType, matIndex: number): Promise<void> {
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
    }

    private mapParts(parts: Part[], iParts: IPart[]) {
        iParts.forEach(ipart => {
            const p: Part | undefined = parts.find((part) => part.getName() === ipart.name);
            if (!p) return;
            this.mapMeshes(p.getMeshes(), ipart.meshes);
        });
    }

    private mapMeshes(meshes: Mesh[], iMeshes: IMesh[]) {
        iMeshes.forEach(imesh => {
            const m: Mesh | undefined = meshes.find((mesh) => mesh.name === imesh.name);
            if (!m) return;

            if (imesh.materials === MaterialType.Soft)
                this.softMeshes.push(m);
            else if (imesh.materials === MaterialType.Hard)
                this.hardMeshes.push(m);
            else if (imesh.materials === MaterialType.Other)
                this.otherMeshes.push(m);
        });
    }

    private async changeMat(meshesToChange: Mesh[], material: MeshPhysicalMaterial) {
        for (const mesh of meshesToChange) {
            const mat: MeshPhysicalMaterial = material.clone();
            material.aoMap = await Utility.loadTexture(`occlusions/SelfOcclusion_${mesh.name}.png`);
            (mesh.material as MeshPhysicalMaterial).dispose();
            mesh.material = material;
        }
    }

}