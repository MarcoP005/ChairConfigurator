import { Cache } from "three";
import { Component, MaterialType } from "./generals/Enums";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";
import { UIManager as UIManager } from "./managers/UIManager";
import { PDFCreator } from "./PDFCreator";

export class Viewer3D {
  private container: HTMLElement;
  private sceneManager: SceneManager;
  private renderManager: RenderManager;
  private uiManager: UIManager;
  private pdfCreator: PDFCreator;

  public constructor(options: { containerID: string }) {
    Cache.enabled = true;
    this.container = document.getElementById(options.containerID)!;

    this.uiManager = new UIManager(this);
    this.sceneManager = new SceneManager(this.container, this.uiManager);
    this.renderManager = new RenderManager(this.container, this.sceneManager.getScene(), this.sceneManager.getCamera(), this.sceneManager.getControls());
    this.pdfCreator = new PDFCreator(this.container, this.renderManager, this.sceneManager);
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

  public getPDFCreator(): PDFCreator {
    return this.pdfCreator;
  }
}