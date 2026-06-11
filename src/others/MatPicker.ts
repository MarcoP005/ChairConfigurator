import { Mesh, MeshPhysicalMaterial } from "three";
import { chairConfig, files } from "./ChairConfig";
import { MaterialType } from "../generals/Enums";
import Utility from "../generals/Utility";
import Mapper from "../generals/Mapper";
import Chair from "./Chair";

export default class MatPicker {
    private softMeshes: Mesh[] = [];
    private hardMeshes: Mesh[] = [];
    private otherMeshes: Mesh[] = [];

    private curSoftMat!: string;
    private curHardMat!: string;
    private curOtherMat!: string;

    public constructor(chair: Chair) {
        Mapper.mapParts(chair.getLegs(), chairConfig.components.legs, this);
        Mapper.mapParts(chair.getSeats(), chairConfig.components.seats, this);
        Mapper.mapParts(chair.getBacks(), chairConfig.components.backs, this);
        Mapper.mapParts(chair.getArms(), chairConfig.components.arms, this);
        Mapper.mapParts(chair.getFixed(), chairConfig.fixed, this);

        this.setMaterial(MaterialType.Soft, files.softMaterials[0]);
        this.setMaterial(MaterialType.Hard, files.hardMaterials[0]);
        this.setMaterial(MaterialType.Other, files.otherMaterials[0]);
    }

    public async setMaterial(matType: MaterialType, matFile: string): Promise<void> {
        let newMat: MeshPhysicalMaterial | undefined;
        switch (matType) {
            case MaterialType.Soft:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.setupNewMat(this.softMeshes, newMat);
                this.curSoftMat = matFile;
                break;
            case MaterialType.Hard:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.setupNewMat(this.hardMeshes, newMat);
                this.curHardMat = matFile;
                break;
            case MaterialType.Other:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.setupNewMat(this.otherMeshes, newMat);
                this.curOtherMat = matFile;
                break;
        }
    }

    private async setupNewMat(meshesToChange: Mesh[], material: MeshPhysicalMaterial) {
        for (const mesh of meshesToChange) {
            const mat: MeshPhysicalMaterial = material.clone();
            mat.aoMap = await Utility.loadTexture(`occlusions/Occlusion_${mesh.name}.png`);
            mat.aoMap.flipY = false;
            (mesh.material as MeshPhysicalMaterial).dispose();
            mesh.material = mat;
        }
    }

    public getCurSoftMat(): string { return this.curSoftMat; }

    public getCurHardMat(): string { return this.curHardMat; }

    public getCurOtherMat(): string { return this.curOtherMat; }

    public getSoftMeshes(): Mesh[] { return this.softMeshes; }

    public getHardMeshes(): Mesh[] { return this.hardMeshes; }

    public getOtherMeshes(): Mesh[] { return this.otherMeshes; }

}