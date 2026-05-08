import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Chair, { Component } from "./Chair";

export default class Debug {
    private chair: Chair;
    private gui: GUI = new GUI();
    public constructor(chair: Chair) {
        this.chair = chair;

        const matFolder: GUI = this.gui.addFolder("Materials");
        const partFolder: GUI = this.gui.addFolder("Parts");

        const debugObj: {
            innerMatIndex: number,
            outerMatIndex: number,
            legName: string,
            seatName: string,
            backName: string,
            armName: string
        } = {
            innerMatIndex: 0,
            outerMatIndex: 0,
            legName: chair.getCurLeg().getName(),
            seatName: chair.getCurSeat().getName(),
            backName: chair.getCurBack().getName(),
            armName: chair.getCurArm().getName()
        };

        matFolder.add(debugObj, "innerMatIndex", {
            Red: 0,
            Blue: 1,
            Green: 2,
            Fabric: 3
        })
            .onChange(() => chair.setInnerMat(debugObj.innerMatIndex))
            .name("Inner");

        matFolder.add(debugObj, "outerMatIndex", {
            Blue: 0,
            Yellow: 1,
            Purple: 2,
            Metal: 3
        })
            .onChange(() => chair.setOuterMat(debugObj.outerMatIndex))
            .name("Outer");


        partFolder.add(debugObj, "legName", {
            Wheels: "leg_01",
            Tulip: "leg_02",
            Cantilever: "leg_03"
        })
            .onChange(() => chair.setPart(debugObj.legName, Component.leg))
            .name("Leg");
        partFolder.add(debugObj, "seatName", {
            Square: "seat_01",
            Round: "seat_02"
        })
            .onChange(() => chair.setPart(debugObj.seatName, Component.seat))
            .name("Seat");
        partFolder.add(debugObj, "backName", {
            Square: "back_01",
            Round: "back_02"
        })
            .onChange(() => chair.setPart(debugObj.backName, Component.back))
            .name("Back");
        partFolder.add(debugObj, "armName", {
            Curve: "arm_01",
            Straight: "arm_02",
            Lateral: "arm_03"
        })
            .onChange(() => chair.setPart(debugObj.armName, Component.arm))
            .name("Arm");
    }
}