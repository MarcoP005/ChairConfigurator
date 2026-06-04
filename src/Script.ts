import { Viewer3D } from "./Viewer3D";
import { files } from "./config/ChairConfig";

export class Script {
    private viewer3D: Viewer3D;

    public constructor(viewer3D: Viewer3D) {
        this.viewer3D = viewer3D;
    }

    public initScripts(): void {
        document.getElementById("squareBack")?.addEventListener("click", () => this.viewer3D.SetBack("back_01"));
        document.getElementById("roundBack")?.addEventListener("click", () => this.viewer3D.SetBack("back_02"));

        document.getElementById("squareSeat")?.addEventListener("click", () => this.viewer3D.SetSeat("seat_01"));
        document.getElementById("roundSeat")?.addEventListener("click", () => this.viewer3D.SetSeat("seat_02"));

        document.getElementById("wheels")?.addEventListener("click", () => this.viewer3D.SetLeg("leg_01"));
        document.getElementById("tulip")?.addEventListener("click", () => this.viewer3D.SetLeg("leg_02"));
        document.getElementById("cantilever")?.addEventListener("click", () => this.viewer3D.SetLeg("leg_03"));

        document.getElementById("curve")?.addEventListener("click", () => this.viewer3D.SetArm("arm_01"));
        document.getElementById("straight")?.addEventListener("click", () => this.viewer3D.SetArm("arm_02"));
        document.getElementById("lateral")?.addEventListener("click", () => this.viewer3D.SetArm("arm_03"));

        document.getElementById("soft-mat-1")?.addEventListener("click", () => this.viewer3D.SetSoftMat(files.softMaterials[0].toString()));
        document.getElementById("soft-mat-2")?.addEventListener("click", () => this.viewer3D.SetSoftMat(files.softMaterials[1].toString()));
        document.getElementById("soft-mat-3")?.addEventListener("click", () => this.viewer3D.SetSoftMat(files.softMaterials[2].toString()));

        document.getElementById("autorotate")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.ToggleAutoRotate(checked);
        });

        document.getElementById("lights")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.ToggleLights(checked);
        });
    }
}