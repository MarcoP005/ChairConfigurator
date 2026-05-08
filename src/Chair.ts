import { Material, Mesh, MeshStandardMaterial } from "three";
import Part from "./Part";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export enum Component {
    leg,
    seat,
    back,
    arm
}

export default class Chair {
    private legs: Part[];
    private seats: Part[];
    private backs: Part[];
    private arms: Part[];
    private base: Part;

    private currentLegPart: Part;
    private currentSeatPart: Part;
    private currentBackPart: Part;
    private currentArmPart: Part;

    private outerMeshes: Mesh[] = [];
    private innerMeshes: Mesh[] = [];

    private gltfLoader: GLTFLoader = new GLTFLoader();

    public outerMats: Material[] = [
        new MeshStandardMaterial({ color: 0x00ffff, metalness: 1, roughness: 0.4 }),
        new MeshStandardMaterial({ color: 0xffff00, metalness: 1, roughness: 0.4 }),
        new MeshStandardMaterial({ color: 0xff00ff, metalness: 1, roughness: 0.4 })
    ];
    public innerMats: Material[] = [
        new MeshStandardMaterial({ color: 0xff0000 }),
        new MeshStandardMaterial({ color: 0x0000ff }),
        new MeshStandardMaterial({ color: 0x00ff00 })
    ];

    public getCurLeg(): Part {
        return this.currentLegPart;
    }

    public getCurSeat(): Part {
        return this.currentSeatPart;
    }

    public getCurBack(): Part {
        return this.currentBackPart;
    }

    public getCurArm(): Part {
        return this.currentArmPart;
    }

    public constructor(legs: Part[], seats: Part[], backs: Part[], arms: Part[], base: Part) {
        this.legs = legs;
        this.seats = seats;
        this.backs = backs;
        this.arms = arms;
        this.base = base;

        this.currentLegPart = legs[0];
        this.currentSeatPart = seats[0];
        this.currentBackPart = backs[0];
        this.currentArmPart = arms[0];

        this.onlyCurrentVisible();

        this.defineInnerOuter();

        this.setInnerMat(0);
        this.setOuterMat(0);
    }

    public onlyCurrentVisible(): void {
        this.legs.forEach(part => {
            part.setVisible(false);
        });
        this.seats.forEach(part => {
            part.setVisible(false);
        });
        this.backs.forEach(part => {
            part.setVisible(false);
        });
        this.arms.forEach(part => {
            part.setVisible(false);
        });
        this.currentLegPart.setVisible(true);
        this.currentSeatPart.setVisible(true);
        this.currentBackPart.setVisible(true);
        this.currentArmPart.setVisible(true);
    }

    public setPart(partName: string, chairPart: Component): void {
        let newCur: Part | undefined;
        switch (chairPart) {
            case Component.leg:
                newCur = this.legs.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentLegPart.setVisible(false);
                newCur.setVisible(true);
                this.currentLegPart = newCur;
                break;
            case Component.seat:
                newCur = this.seats.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentSeatPart.setVisible(false);
                newCur.setVisible(true);
                this.currentSeatPart = newCur;
                break;
            case Component.back:
                newCur = this.backs.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentBackPart.setVisible(false);
                newCur.setVisible(true);
                this.currentBackPart = newCur;
                break;
            case Component.arm:
                newCur = this.arms.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentArmPart.setVisible(false);
                newCur.setVisible(true);
                this.currentArmPart = newCur;
                break;
        }
    }

    public setOuterMat(index: number): void {
        this.setMaterial(this.outerMats, index, this.outerMeshes);
    }

    public setInnerMat(index: number): void {
        this.setMaterial(this.innerMats, index, this.innerMeshes);
    }

    public setMaterial(materials: Material[], index: number, meshes: Mesh[]): void {
        meshes.forEach(mesh => {
            mesh.material = materials[index];
        });
    }

    private defineInnerOuter(): void {
        this.legs.forEach(part => {
            part.getMeshes().forEach(mesh => {
                if (!this.outerMeshes.includes(mesh))
                    this.outerMeshes.push(mesh);
            });
        });
        this.seats.forEach(part => {
            part.getMeshes().forEach(mesh => {
                if (!this.innerMeshes.includes(mesh))
                    this.innerMeshes.push(mesh);
            });
        });
        this.backs.forEach(part => {
            part.getMeshes().forEach(mesh => {
                if (!this.innerMeshes.includes(mesh))
                    this.innerMeshes.push(mesh);
            });
        });
        this.arms.forEach(part => {
            part.getMeshes().forEach(mesh => {
                if (mesh.name === "ArmRests") {
                    if (!this.innerMeshes.includes(mesh))
                        this.innerMeshes.push(mesh);
                }
                else
                    this.outerMeshes.push(mesh);
            });
        });
        this.base.getMeshes().forEach(mesh => {
            this.outerMeshes.push(mesh);
        });
    }
}
