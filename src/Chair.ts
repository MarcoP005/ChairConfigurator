import Part from "./Part";

export default class Chair {
    private legs: Part[];
    private seats: Part[];
    private backs: Part[];
    private arms: Part[];

    public constructor(legs: Part[], seat: Part[], back: Part[], arms: Part[]) {
        this.legs = legs;
        this.seats = seat;
        this.backs = back;
        this.arms = arms;
        this.setPart(legs[0].getName());
        this.setPart(seat[0].getName());
        this.setPart(back[0].getName());
        this.setPart(arms[0].getName());
    }

    public getLegs(): Part[] {
        return this.legs;
    }

    public getSeat(): Part[] {
        return this.seats;
    }

    public getBack(): Part[] {
        return this.backs;
    }

    public getArms(): Part[] {
        return this.arms;
    }

    public setPart(partName: string): void {
        // TODO: set visibility di ogni parte andando a cercare dentro le referenze delle variabili d'ambiente
        const foundInLegs: Part | undefined = this.legs.find((p) => p.getName() === partName);
        if(foundInLegs){
            this.legs.forEach(part => {
                part.setVisible(false);
            });
            foundInLegs.setVisible(true);
            return;
        }
        const foundInSeats: Part | undefined = this.seats.find((p) => p.getName() === partName);
        if(foundInSeats){
            this.seats.forEach(part => {
                part.setVisible(false);
            });
            foundInSeats.setVisible(true);
            return;
        }
        const foundInBacks: Part | undefined = this.backs.find((p) => p.getName() === partName);
        if(foundInBacks){
            this.backs.forEach(part => {
                part.setVisible(false);
            });
            foundInBacks.setVisible(true);
            return;
        }
        const foundInArms: Part | undefined = this.arms.find((p) => p.getName() === partName);
        if(foundInArms){
            this.arms.forEach(part => {
                part.setVisible(false);
            });
            foundInArms.setVisible(true);
            return;
        }
    }
}