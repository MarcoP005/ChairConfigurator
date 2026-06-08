import { Viewer3D } from "./Viewer3D";
import { files } from "./config/ChairConfig";

export class Script {
    private viewer3D: Viewer3D;

    public constructor(viewer3D: Viewer3D) {
        this.viewer3D = viewer3D;
    }

    public initScripts(): void {
        document.getElementById("square-back-rad")?.addEventListener("click", () => this.viewer3D.setBack("back_01"));
        document.getElementById("round-back-rad")?.addEventListener("click", () => this.viewer3D.setBack("back_02"));

        document.getElementById("square-seat-rad")?.addEventListener("click", () => this.viewer3D.setSeat("seat_01"));
        document.getElementById("round-seat-rad")?.addEventListener("click", () => this.viewer3D.setSeat("seat_02"));

        document.getElementById("wheels-leg-rad")?.addEventListener("click", () => this.viewer3D.setLeg("leg_01"));
        document.getElementById("tulip-leg-rad")?.addEventListener("click", () => this.viewer3D.setLeg("leg_02"));
        document.getElementById("cantilever-leg-rad")?.addEventListener("click", () => this.viewer3D.setLeg("leg_03"));

        document.getElementById("curve-arm-rad")?.addEventListener("click", () => this.viewer3D.setArm("arm_01"));
        document.getElementById("straight-arm-rad")?.addEventListener("click", () => this.viewer3D.setArm("arm_02"));
        document.getElementById("lateral-arm-rad")?.addEventListener("click", () => this.viewer3D.setArm("arm_03"));

        document.getElementById("soft-mat-1-rad")?.addEventListener("click", () => this.viewer3D.setSoftMat(files.softMaterials[0].toString()));
        document.getElementById("soft-mat-2-rad")?.addEventListener("click", () => this.viewer3D.setSoftMat(files.softMaterials[1].toString()));
        document.getElementById("soft-mat-3-rad")?.addEventListener("click", () => this.viewer3D.setSoftMat(files.softMaterials[2].toString()));

        document.getElementById("hard-mat-1-rad")?.addEventListener("click", () => this.viewer3D.setHardMat(files.hardMaterials[0].toString()));
        document.getElementById("hard-mat-2-rad")?.addEventListener("click", () => this.viewer3D.setHardMat(files.hardMaterials[1].toString()));
        document.getElementById("hard-mat-3-rad")?.addEventListener("click", () => this.viewer3D.setHardMat(files.hardMaterials[2].toString()));

        document.getElementById("other-mat-1-rad")?.addEventListener("click", () => this.viewer3D.setOtherMat(files.otherMaterials[0].toString()));
        document.getElementById("other-mat-2-rad")?.addEventListener("click", () => this.viewer3D.setOtherMat(files.otherMaterials[1].toString()));
        document.getElementById("other-mat-3-rad")?.addEventListener("click", () => this.viewer3D.setOtherMat(files.otherMaterials[2].toString()));

        document.getElementById("autorotate-chkbx")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.toggleAutoRotate(checked);
        });

        document.getElementById("lights-chkbx")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.toggleLights(checked);
        });

        document.getElementById("download-config-btn")?.addEventListener("click", (e) => {
            this.viewer3D.downloadRender();
        });
    }
}