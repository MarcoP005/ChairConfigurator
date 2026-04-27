import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import ChairJSON from "./chair_config.json";

export default class Debug {

    public static selectedComp: { selectedLegs: string, selectedSeat: string, selectedBack: string, selectedArms: string } =
        {
            selectedLegs: "",
            selectedSeat: "",
            selectedBack: "",
            selectedArms: ""
        };
    private gui: GUI = new GUI();

    private legs: string[] = [];
    private seat: string[] = [];
    private back: string[] = [];
    private arms: string[] = [];

    constructor() {
        ChairJSON.components.legs.forEach(element => {
            this.legs.push(element.name);
        });
        ChairJSON.components.seat.forEach(element => {
            this.seat.push(element.name);
        });
        ChairJSON.components.back.forEach(element => {
            this.back.push(element.name);
        });
        ChairJSON.components.arms.forEach(element => {
            this.arms.push(element.name);
        });
        Debug.selectedComp.selectedLegs = this.legs[0];
        Debug.selectedComp.selectedSeat = this.seat[0];
        Debug.selectedComp.selectedBack = this.back[0];
        Debug.selectedComp.selectedArms = this.arms[0];

        this.gui.add(Debug.selectedComp, "selectedLegs", this.legs).name("Legs");
        this.gui.add(Debug.selectedComp, "selectedSeat", this.seat).name("Seat");
        this.gui.add(Debug.selectedComp, "selectedBack", this.back).name("Back");
        this.gui.add(Debug.selectedComp, "selectedArms", this.arms).name("Arns");
    }
}