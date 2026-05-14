import { GLTFLoader } from "three/examples/jsm/Addons.js";
import Part from "./Part";
import { Component } from "./Enums";

export default class Chair {
    private legs: Part[];
    private seats: Part[];
    private backs: Part[];
    private arms: Part[];
    private base: Part;

    private allParts: Part[] = [];

    private curLeg: Part;
    private curSeat: Part;
    private curBack: Part;
    private curArm: Part;

    public getCurLeg(): Part {
        return this.curLeg;
    }

    public getCurSeat(): Part {
        return this.curSeat;
    }

    public getCurBack(): Part {
        return this.curBack;
    }

    public getCurArm(): Part {
        return this.curArm;
    }

    public constructor(legs: Part[], seats: Part[], backs: Part[], arms: Part[], base: Part) {
        this.curLeg = legs[0];
        this.curSeat = seats[0];
        this.curBack = backs[0];
        this.curArm = arms[0];

        this.allParts.push(...legs, ...seats, ...backs, ...arms);
        this.onlyCurrentVisible();

        this.legs = legs;
        this.seats = seats;
        this.backs = backs;
        this.arms = arms;
        this.base = base;
    }

    private onlyCurrentVisible(): void {
        this.allParts.forEach(part => part.setVisible(false));
        this.curLeg.setVisible(true);
        this.curSeat.setVisible(true);
        this.curBack.setVisible(true);
        this.curArm.setVisible(true);
    }

    public setPart(chairPart: Component, newPart: string): void {
        let newCur: Part | undefined;
        switch (chairPart) {
            case Component.leg:
                newCur = this.legs.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curLeg.setVisible(false);
                newCur.setVisible(true);
                this.curLeg = newCur;
                break;
            case Component.seat:
                newCur = this.seats.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curSeat.setVisible(false);
                newCur.setVisible(true);
                this.curSeat = newCur;
                break;
            case Component.back:
                newCur = this.backs.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curBack.setVisible(false);
                newCur.setVisible(true);
                this.curBack = newCur;
                break;
            case Component.arm:
                newCur = this.arms.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curArm.setVisible(false);
                newCur.setVisible(true);
                this.curArm = newCur;
                break;
        }
    }
}
