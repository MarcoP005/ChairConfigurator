import { Mesh, MeshPhysicalMaterial } from "three";
import { MaterialType } from "../generals/Enums";
import Mapper from "../generals/Mapper";
import Utility from "../generals/Utility";
import Chair from "./Chair";
import { chairConfig, files } from "./ChairConfig";

export default class MatPicker {
    private fabricMeshes: Mesh[] = [];
    private metalMeshes: Mesh[] = [];
    private plasticMeshes: Mesh[] = [];

    private curFabricMat!: string;
    private curMetalMat!: string;
    private curPlasticMat!: string;

    public constructor(chair: Chair) {
        Mapper.mapParts(chair.getLegs(), chairConfig.components.legs, this);
        Mapper.mapParts(chair.getSeats(), chairConfig.components.seats, this);
        Mapper.mapParts(chair.getBacks(), chairConfig.components.backs, this);
        Mapper.mapParts(chair.getArms(), chairConfig.components.arms, this);
        Mapper.mapParts(chair.getFixed(), chairConfig.fixed, this);

        this.setMaterial(MaterialType.fabric, files.fabrics[0]);
        this.setMaterial(MaterialType.metal, files.metals[0]);
        this.setMaterial(MaterialType.plastic, files.plastics[0]);
    }

    public async setMaterial(matType: MaterialType, matFile: string): Promise<void> {
        let newMat: MeshPhysicalMaterial | undefined;
        switch (matType) {
            case MaterialType.fabric:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.setupNewMat(this.fabricMeshes, newMat);
                this.curFabricMat = matFile;
                break;
            case MaterialType.metal:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.setupNewMat(this.metalMeshes, newMat);
                this.curMetalMat = matFile;
                break;
            case MaterialType.plastic:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.setupNewMat(this.plasticMeshes, newMat);
                this.curPlasticMat = matFile;
                break;
        }
    }

    private async setupNewMat(meshesToChange: Mesh[], material: MeshPhysicalMaterial) {
        for (const mesh of meshesToChange) {
            const mat: MeshPhysicalMaterial = material.clone();
            mat.aoMap = await Utility.loadTexture(`occlusions/Occlusion_${mesh.name}.png`);
            mat.aoMap.flipY = false;
            this.setAnisotropy(mat);
            mat.aoMap.needsUpdate = true;
            mat.needsUpdate = true;
            (mesh.material as MeshPhysicalMaterial).dispose();
            mesh.material = mat;
        }
    }

    private setAnisotropy(mat: MeshPhysicalMaterial): void {
        const max: number = this.getMaxAnisotropy(16);
        mat.anisotropy = max;
        if (mat.map) mat.map.anisotropy = max;
        if (mat.aoMap) mat.aoMap.anisotropy = max;
        if (mat.normalMap) mat.normalMap.anisotropy = max;
        if (mat.roughnessMap) mat.roughnessMap.anisotropy = max;
    }

    private getMaxAnisotropy(clamp: number): number {
        const max: number = Utility.maxAnisotropy > clamp ? clamp : Utility.maxAnisotropy;
        if (Utility.maxAnisotropy === 0) console.warn("Anisotropy set to ", Utility.maxAnisotropy);
        return max;
    }

    public getCurFabricMat(): string { return this.curFabricMat; }

    public getCurMetalMat(): string { return this.curMetalMat; }

    public getCurPlasticMat(): string { return this.curPlasticMat; }

    public getFabricMeshes(): Mesh[] { return this.fabricMeshes; }

    public getMetalMeshes(): Mesh[] { return this.metalMeshes; }

    public getPlasticMeshes(): Mesh[] { return this.plasticMeshes; }

}