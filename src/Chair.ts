import { Mesh, MeshStandardMaterial } from "three";
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

    public myOuterMats: MeshStandardMaterial[] = [
        new MeshStandardMaterial({ color: 0x00ffff, metalness: 1, roughness: 0.4 }),
        new MeshStandardMaterial({ color: 0xffff00, metalness: 1, roughness: 0.4 }),
        new MeshStandardMaterial({ color: 0xff00ff, metalness: 1, roughness: 0.4 })
    ];
    public myInnerMats: MeshStandardMaterial[] = [
        new MeshStandardMaterial({ color: 0xff0000 }),
        new MeshStandardMaterial({ color: 0x0000ff }),
        new MeshStandardMaterial({ color: 0x00ff00 })
    ];

    public constructor(leg: Part[], seat: Part[], back: Part[], arm: Part[], base: Part[]) {
        this.legs = leg;
        this.seats = seat;
        this.backs = back;
        this.arms = arm;
        this.base = base;

        this.currentLegPart = leg[0];
        this.currentSeatPart = seat[0];
        this.currentBackPart = back[0];
        this.currentArmPart = arm[0];


        this.onlyCurrentVisible();

        this.setPart(this.currentLegPart.getName(), ChairPart.leg);
        this.setPart(this.currentSeatPart.getName(), ChairPart.seat);
        this.setPart(this.currentBackPart.getName(), ChairPart.back);
        this.setPart(this.currentArmPart.getName(), ChairPart.arm);

        this.defineInnerOuter();
        this.setMaterial(0);
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

    public setMaterial(index: number): void {
        this.innerMeshes.forEach(mesh => {
            mesh.material = this.myInnerMats[index];
        });
        this.outerMeshes.forEach(mesh => {
            mesh.material = this.myOuterMats[index];
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
