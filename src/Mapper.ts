import { Mesh, Object3D } from "three";
import { chairConfig } from "./config/ChairConfig";
import { MaterialType } from "./generals/Enums";
import { IMesh, IPart } from "./generals/Interfaces";
import Chair from "./specifics/Chair";
import MatPicker from "./specifics/MatPicker";
import Part from "./specifics/Part";

export default class Mapper {
    public static mapModelToChair(chairModel: Object3D): Chair {
        const leg01: Part = new Part(chairModel, chairConfig.components.legs[0]);
        const leg02: Part = new Part(chairModel, chairConfig.components.legs[1]);
        const leg03: Part = new Part(chairModel, chairConfig.components.legs[2]);

        const seat01: Part = new Part(chairModel, chairConfig.components.seats[0]);
        const seat02: Part = new Part(chairModel, chairConfig.components.seats[1]);

        const back01: Part = new Part(chairModel, chairConfig.components.backs[0]);
        const back02: Part = new Part(chairModel, chairConfig.components.backs[1]);

        const arm01: Part = new Part(chairModel, chairConfig.components.arms[0]);
        const arm02: Part = new Part(chairModel, chairConfig.components.arms[1]);
        const arm03: Part = new Part(chairModel, chairConfig.components.arms[2]);

        const base: Part = new Part(chairModel, chairConfig.fixed[0]);

        const legs: Part[] = [leg01, leg02, leg03];
        const seats: Part[] = [seat01, seat02];
        const backs: Part[] = [back01, back02];
        const arms: Part[] = [arm01, arm02, arm03];
        const fixed: Part[] = [base];

        return new Chair(legs, seats, backs, arms, fixed);
    }

    public static mapParts(parts: Part[], iParts: IPart[], matPicker: MatPicker): void {
        iParts.forEach(ipart => {
            const p: Part | undefined = parts.find((part) => part.getName() === ipart.name);
            if (!p) return;
            this.mapMeshes(p.getMeshes(), ipart.meshes, matPicker);
        });
    }

    public static mapMeshes(meshes: Mesh[], iMeshes: IMesh[], matPicker: MatPicker): void {
        iMeshes.forEach(imesh => {
            const m: Mesh | undefined = meshes.find((mesh) => mesh.name === imesh.name);
            if (!m) return;

            if (imesh.materials === MaterialType.Soft)
                matPicker.getSoftMeshes().push(m);
            else if (imesh.materials === MaterialType.Hard)
                matPicker.getHardMeshes().push(m);
            else if (imesh.materials === MaterialType.Other)
                matPicker.getOtherMeshes().push(m);
        });
    }
}
