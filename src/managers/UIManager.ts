import { DefaultLoadingManager } from "three";
import { Component, MaterialType } from "../generals/Enums";
import { chairConfig, files } from "../others/ChairConfig";
import Viewer3D from "../Viewer3D";

export default class UIManager {
    private viewer3D: Viewer3D;

    public constructor(viewer3D: Viewer3D) {
        this.viewer3D = viewer3D;
        this.loadingScreen();
        this.addEventsToButtons();
    }

    private loadingScreen(): void {
        const progressBarContainer: HTMLElement = document.getElementById("progress-bar-container")!;
        const progressBar: HTMLProgressElement = document.getElementById("progress-bar") as HTMLProgressElement;

        DefaultLoadingManager
            .onProgress = (url: string, loaded: number, total: number) => {
                progressBar.value = (loaded / total) * 100;
            };

        DefaultLoadingManager
            .onLoad = () => {
                progressBarContainer.style.display = "none";
            };
    }

    public addEventsToButtons(): void {

        this.addSetPartEvent("back-0-rad", chairConfig.components.backs[0].name, Component.back);
        this.addSetPartEvent("back-1-rad", chairConfig.components.backs[1].name, Component.back);

        this.addSetPartEvent("seat-0-rad", chairConfig.components.seats[0].name, Component.seat);
        this.addSetPartEvent("seat-1-rad", chairConfig.components.seats[1].name, Component.seat);

        this.addSetPartEvent("leg-0-rad", chairConfig.components.legs[0].name, Component.leg);
        this.addSetPartEvent("leg-1-rad", chairConfig.components.legs[1].name, Component.leg);
        this.addSetPartEvent("leg-2-rad", chairConfig.components.legs[2].name, Component.leg);

        this.addSetPartEvent("arm-0-rad", chairConfig.components.arms[0].name, Component.arm);
        this.addSetPartEvent("arm-1-rad", chairConfig.components.arms[1].name, Component.arm);
        this.addSetPartEvent("arm-2-rad", chairConfig.components.arms[2].name, Component.arm);

        this.addSetMaterialEvent("soft-mat-0-rad", "soft-mat-0-label", files.softMaterials[0], MaterialType.Soft);
        this.addSetMaterialEvent("soft-mat-1-rad", "soft-mat-1-label", files.softMaterials[1], MaterialType.Soft);
        this.addSetMaterialEvent("soft-mat-2-rad", "soft-mat-2-label", files.softMaterials[2], MaterialType.Soft);

        this.addSetMaterialEvent("hard-mat-0-rad", "hard-mat-0-label", files.hardMaterials[0], MaterialType.Hard);
        this.addSetMaterialEvent("hard-mat-1-rad", "hard-mat-1-label", files.hardMaterials[1], MaterialType.Hard);
        // this.addSetMaterialEvent("hard-mat-2-rad", "hard-mat-2-label", files.hardMaterials[2], MaterialType.Hard);

        this.addSetMaterialEvent("other-mat-0-rad", "other-mat-0-label", files.otherMaterials[0], MaterialType.Other);
        this.addSetMaterialEvent("other-mat-1-rad", "other-mat-1-label", files.otherMaterials[1], MaterialType.Other);
        // this.addSetMaterialEvent("other-mat-2-rad", "other-mat-2-label", files.otherMaterials[2], MaterialType.Hard);

        document.getElementById("autorotate-chkbx")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.toggleAutoRotate(checked);
        });

        document.getElementById("lights-chkbx")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.toggleLights(checked);
        });
    }

    private addSetPartEvent(buttonName: string, partName: string, componentType: Component): void {
        const button: HTMLElement | null = document.getElementById(buttonName);
        if (!button) return console.log(buttonName, "not found.");

        switch (componentType) {
            case Component.back:
                button.addEventListener("click", () => this.viewer3D.setBack(partName));
                break;
            case Component.seat:
                button.addEventListener("click", () => this.viewer3D.setSeat(partName));
                break;
            case Component.leg:
                button.addEventListener("click", () => this.viewer3D.setLeg(partName));
                break;
            case Component.arm:
                button.addEventListener("click", () => this.viewer3D.setArm(partName));
                break;
        }
        button.nextSibling!.textContent = partName;
    }

    private addSetMaterialEvent(buttonName: string, labelName: string, materialName: string, materialType: MaterialType): void {
        const button: HTMLElement | null = document.getElementById(buttonName);
        if (!button) return;
        const label: HTMLElement | null = document.getElementById(labelName);

        switch (materialType) {
            case MaterialType.Soft:
                button.addEventListener("click", () => this.viewer3D.setSoftMat(materialName));
                break;
            case MaterialType.Hard:
                button.addEventListener("click", () => this.viewer3D.setHardMat(materialName));
                break;
            case MaterialType.Other:
                button.addEventListener("click", () => this.viewer3D.setOtherMat(materialName));
                break;
        }

        (label as HTMLSpanElement).textContent = materialName.replace(".glb", "");
    }

    public addDownloadEvent(): void {
        const downloadBtn: HTMLElement = document.getElementById("download-config-btn")!;
        downloadBtn.addEventListener("click", (e) => { this.viewer3D.getPDFCreator().downloadPDF(); });
    }
}