import { Material, Mesh, MeshStandardMaterial } from "three";
import Part from "./Part";

export enum ChairPart {
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
    private base: Part[];

    private currentLegPart: Part;
    private currentSeatPart: Part;
    private currentBackPart: Part;
    private currentArmPart: Part;

    private outerMeshes: Mesh[] = [];
    private innerMeshes: Mesh[] = [];

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

    // public currentInnerMat: Material = this.innerMats[0];
    // private currentOuterMat: Material = this.outerMats[0];
    public currentInnerMatIndex: number = 0; //lilgui non accetta Material
    public currentOuterMatIndex: number = 0;

    public constructor(legs: Part[], seats: Part[], backs: Part[], arms: Part[], base: Part[]) {
        this.legs = legs;
        this.seats = seats;
        this.backs = backs;
        this.arms = arms;
        this.base = base;

        this.currentLegPart = legs[0];
        this.currentSeatPart = seats[0];
        this.currentBackPart = backs[0];
        this.currentArmPart = arms[0];
        console.log(arms[0]);

        this.onlyCurrentVisible();

        this.setPart(this.currentArmPart.getName(), ChairPart.arm); //??

        this.defineInnerOuter();
        this.setInnerMat(0);
        this.setOuterMat(0);
    }

    public onlyCurrentVisible(): void {
        this.legs.forEach(part => {
            if (part !== this.currentLegPart)
                part.setVisible(false);
        });
        this.seats.forEach(part => {
            if (part !== this.currentSeatPart)
                part.setVisible(false);
        });
        this.backs.forEach(part => {
            if (part !== this.currentBackPart)
                part.setVisible(false);
        });
        this.arms.forEach(part => {
            if (part !== this.currentArmPart)
                part.setVisible(false);
        });
    }

    public getLegs(): Part[] {
        return this.legs;
    }

    public getSeats(): Part[] {
        return this.seats;
    }

    public getBacks(): Part[] {
        return this.backs;
    }

    public getArms(): Part[] {
        return this.arms;
    }

    public setPart(partName: string, chairPart: ChairPart): void {
        let newCur: Part | undefined;
        switch (chairPart) {
            case ChairPart.leg:
                this.currentLegPart.setVisible(false);
                newCur = this.legs.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentLegPart = newCur;
                this.currentLegPart.setVisible(true);
                break;
            case ChairPart.seat:
                this.currentSeatPart.setVisible(false);
                newCur = this.seats.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentSeatPart = newCur;
                this.currentSeatPart.setVisible(true);
                break;
            case ChairPart.back:
                this.currentBackPart.setVisible(false);
                newCur = this.backs.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentBackPart = newCur;
                this.currentBackPart.setVisible(true);
                break;
            case ChairPart.arm:
                this.currentArmPart.setVisible(false);
                newCur = this.arms.find((check) => check.getName() === partName);
                if (!newCur) return;
                this.currentArmPart = newCur;
                this.currentArmPart.setVisible(true);
                break;
        }
    }

    public setOuterMat(index: number): void {
        this.setMaterial(this.outerMats, index, this.outerMeshes);
        this.currentOuterMatIndex = index;
    }

    public setInnerMat(index: number): void {
        this.setMaterial(this.innerMats, index, this.innerMeshes);
        this.currentInnerMatIndex = index;
    }

    public setMaterial(materials: Material[], index: number, meshes: Mesh[]): void {
        meshes.forEach(mesh => {
            mesh.material = materials[index];
        });
    }

    private defineInnerOuter(): void {
        this.legs.forEach(part => {
            part.getMeshes().forEach(mesh => {
                this.outerMeshes.push(mesh);
            });
        });
        this.seats.forEach(part => {
            part.getMeshes().forEach(mesh => {
                this.innerMeshes.push(mesh);
            });
        });
        this.backs.forEach(part => {
            part.getMeshes().forEach(mesh => {
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
        this.base.forEach(part => {
            part.getMeshes().forEach(mesh => {
                this.outerMeshes.push(mesh);
            });
        });
        console.log(this.innerMeshes, this.outerMeshes);
    }
}
