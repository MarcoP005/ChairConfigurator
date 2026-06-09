import { Cache } from "three";
import { Component, MaterialType } from "./generals/Enums";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";
import { Script } from "./Script";
import jsPDF from "jspdf";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;
  private script: Script;

  public constructor(options: { containerID: string }) {
    Cache.enabled = true;
    const container: HTMLElement = document.getElementById(options.containerID)!;
    this.script = new Script(this);

    this.sceneManager = new SceneManager(container, () => this.script.addDownloadConfigEvent());
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container, this.sceneManager.getControls());

    this.script.initScripts();
    // new LilGUI(this);
  }

  public setSoftMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.Soft, matFile);
  }

  public setHardMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.Hard, matFile);
  }

  public setOtherMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.Other, matFile);
  }

  public setLeg(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.leg, partName);
  }

  public setSeat(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.seat, partName);
  }

  public setBack(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.back, partName);
  }

  public setArm(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.arm, partName);
  }

  public toggleAutoRotate(toggle: boolean): void {
    this.sceneManager.getControls().autoRotate = toggle;
  }

  public toggleLights(toggle: boolean): void {
    this.sceneManager.getScene().environmentIntensity = toggle ? 0.2 : 0;
  }

  public createConfigPDF(): void {
    const pdf: jsPDF = new jsPDF();
    this.sceneManager.getChair()?.addChairDataToPDF(pdf);
    this.sceneManager.getMatPicker()?.addMaterialDataToPDF(pdf);
    this.renderManager.saveRenderToPdf(pdf, this.sceneManager.getFrontRenderCamera(), this.sceneManager.getBackRenderCamera());
    pdf.save("config.pdf");
  }
}