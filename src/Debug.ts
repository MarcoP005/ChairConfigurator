import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Chair from "./Chair";

export default class Debug {
    private chair: Chair;
    private gui: GUI = new GUI();
    public constructor(chair: Chair) {
        this.chair = chair;
        this.gui.add(chair, "currentInnerMatIndex",
            {
                Red: 0,
                Blue: 1,
                Green: 2
            }
        )
            .onChange(() => chair.setInnerMat(chair.currentInnerMatIndex))
            .name("Inner material");
        this.gui.add(chair, "currentOuterMatIndex",
            {
                Blue: 0,
                Yellow: 1,
                Purple: 2
            }
        )
            .onChange(() => chair.setOuterMat(chair.currentOuterMatIndex))
            .name("Outer material");
    }
}