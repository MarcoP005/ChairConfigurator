import { Mesh, MeshPhysicalMaterial } from "three";
import { chairConfig, files } from "./ChairConfig";
import { MaterialType } from "../generals/Enums";
import Utility from "../generals/Utility";
import Mapper from "../generals/Mapper";
import Chair from "./Chair";

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
            (mesh.material as MeshPhysicalMaterial).dispose();
            mesh.material = mat;
        }
    }

    public getCurFabricMat(): string { return this.curFabricMat; }

    public getCurMetalMat(): string { return this.curMetalMat; }

    public getCurPlasticMat(): string { return this.curPlasticMat; }

    public getFabricMeshes(): Mesh[] { return this.fabricMeshes; }

    public getMetalMeshes(): Mesh[] { return this.metalMeshes; }

    public getPlasticMeshes(): Mesh[] { return this.plasticMeshes; }

}