import { DefaultLoadingManager, Vector3 } from "three";
import { Component, MaterialType } from "../generals/Enums";
import { chairConfig, files } from "../others/ChairConfig";
import Viewer3D from "../Viewer3D";

export default class UIManager {
    private viewer3D: Viewer3D;

    private startingCamPos: Vector3;

    public constructor(viewer3D: Viewer3D) {
        this.viewer3D = viewer3D;
        this.loadingScreen();
        this.addEventsToButtons();
        this.startingCamPos = viewer3D.getSceneManager().getCamera().position;
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

        this.addSetMaterialEvent("fabric-mat-0-rad", "fabric-mat-0-label", files.fabrics[0], MaterialType.fabric);
        this.addSetMaterialEvent("fabric-mat-1-rad", "fabric-mat-1-label", files.fabrics[1], MaterialType.fabric);
        this.addSetMaterialEvent("fabric-mat-2-rad", "fabric-mat-2-label", files.fabrics[2], MaterialType.fabric);

        this.addSetMaterialEvent("metal-mat-0-rad", "metal-mat-0-label", files.metals[0], MaterialType.metal);
        this.addSetMaterialEvent("metal-mat-1-rad", "metal-mat-1-label", files.metals[1], MaterialType.metal);
        this.addSetMaterialEvent("metal-mat-2-rad", "metal-mat-2-label", files.metals[2], MaterialType.metal);

        this.addSetMaterialEvent("plastic-mat-0-rad", "plastic-mat-0-label", files.plastics[0], MaterialType.plastic);
        this.addSetMaterialEvent("plastic-mat-1-rad", "plastic-mat-1-label", files.plastics[1], MaterialType.plastic);
        this.addSetMaterialEvent("plastic-mat-2-rad", "plastic-mat-2-label", files.plastics[2], MaterialType.plastic);

        document.getElementById("autorotate-chkbx")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.toggleAutoRotate(checked);
        });

        document.getElementById("lights-chkbx")?.addEventListener("change", (e) => {
            const checked: boolean = (e.target as HTMLInputElement).checked;
            this.viewer3D.toggleLights(checked);
        });

        document.getElementById("reset-cam-btn")?.addEventListener("click", () => {
            this.resetCamPos();
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

        switch (materialType) {
            case MaterialType.fabric:
                button.addEventListener("click", () => this.viewer3D.setFabricMat(materialName));
                break;
            case MaterialType.metal:
                button.addEventListener("click", () => this.viewer3D.setMetalMat(materialName));
                break;
            case MaterialType.plastic:
                button.addEventListener("click", () => this.viewer3D.setPlasticMat(materialName));
                break;
        }

        const label: HTMLElement | null = document.getElementById(labelName);
        (label as HTMLSpanElement).textContent = materialName.replace(".glb", "");
    }

    public addDownloadEvent(): void {
        const downloadBtn: HTMLElement = document.getElementById("download-config-btn")!;
        downloadBtn.addEventListener("click", () => { this.viewer3D.getPDFCreator().downloadPDF(); });
    }

    private resetCamPos(): void {
        this.viewer3D.getSceneManager().getCamera().position.copy(this.startingCamPos);
    }
}