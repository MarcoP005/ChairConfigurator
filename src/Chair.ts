import Part from "./Part";

export default class Chair {
    private legs: Part[];
    private seat: Part[];
    private back: Part[];
    private arms: Part[];

    public constructor(legs: Part[], seat: Part[], back: Part[], arms: Part[]) {
        this.legs = legs;
        this.seat = seat;
        this.back = back;
        this.arms = arms;
    }

    public getLegs(): Part[] {
        return this.legs;
    }

    public getSeat(): Part[] {
        return this.seat;
    }

    public getBack(): Part[] {
        return this.back;
    }

    public getArms(): Part[] {
        return this.arms;
    }
}