import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Mesh, MeshPhysicalMaterial } from "three";
import { chairConfig, files } from "../config/ChairConfig";
import { MaterialType } from "../generals/Enums";
import { IMesh, IPart } from "../generals/Interfaces";
import Utility from "../generals/Utility";
import Chair from "./Chair";
import Part from "./Part";

export default class MatPicker {
    private chair: Chair;

    private softMeshes: Mesh[] = [];
    private hardMeshes: Mesh[] = [];
    private otherMeshes: Mesh[] = [];

    private curSoftMat!: string;
    private curHardMat!: string;
    private curOtherMat!: string;

    public constructor(chair: Chair) {
        this.mapParts(chair.getLegs(), chairConfig.components.legs);
        this.mapParts(chair.getSeats(), chairConfig.components.seats);
        this.mapParts(chair.getBacks(), chairConfig.components.backs);
        this.mapParts(chair.getArms(), chairConfig.components.arms);
        this.mapParts(chair.getFixed(), chairConfig.fixed);

        this.setMaterial(MaterialType.Soft, files.softMaterials[0]);
        this.setMaterial(MaterialType.Hard, files.hardMaterials[0]);
        this.setMaterial(MaterialType.Other, files.otherMaterials[0]);
        this.chair = chair;
    }

    public async setMaterial(matType: MaterialType, matFile: string): Promise<void> {
        let newMat: MeshPhysicalMaterial | undefined;
        switch (matType) {
            case MaterialType.Soft:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.changeMat(this.softMeshes, newMat);
                this.curSoftMat = matFile;
                break;
            case MaterialType.Hard:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.changeMat(this.hardMeshes, newMat);
                this.curHardMat = matFile;
                break;
            case MaterialType.Other:
                newMat = ((await Utility.loadModel(`materials/${matFile}`)).children[0] as Mesh).material as MeshPhysicalMaterial;
                this.changeMat(this.otherMeshes, newMat);
                this.curOtherMat = matFile;
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
            mat.aoMap = await Utility.loadTexture(`occlusions/Occlusion_${mesh.name}.png`);
            mat.aoMap.flipY = false;
            (mesh.material as MeshPhysicalMaterial).dispose();
            mesh.material = mat;
        }
    }

    public addMaterialDataToPDF(pdf: jsPDF): void {
        const leftMargin: number = 20;
        const YOffsetFromTable: number = 245;

        autoTable(pdf, {
            startY: YOffsetFromTable,
            margin: { left: leftMargin, right: leftMargin },
            tableLineColor: [41, 128, 168],
            tableLineWidth: 0.5,
            tableWidth: 170,
            columnStyles: {
                0: { cellWidth: 85 },
                1: { cellWidth: 85 }
            },
            head: [
                [{ content: "SELECTED MATERIALS", colSpan: 2, styles: { halign: "center" } }]
            ],
            body: [
                ["SOFT", this.curSoftMat.replace(".glb", "").toUpperCase()],
                ["HARD", this.curHardMat.replace(".glb", "").toUpperCase()],
                ["OTHER", this.curOtherMat.replace(".glb", "").toUpperCase()]
            ]
        });
    }
}