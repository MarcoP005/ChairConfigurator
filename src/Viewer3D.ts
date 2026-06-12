import { Cache } from "three";
import { Component, MaterialType } from "./generals/Enums";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";
import UIManager from "./managers/UIManager";
import ARSupport from "./others/ARSupport";
import PDFCreator from "./others/PDFCreator";

export default class Viewer3D {
  private container: HTMLElement;
  private sceneManager: SceneManager;
  private renderManager: RenderManager;
  private uiManager: UIManager;
  private pdfCreator: PDFCreator;
  private arSupport: ARSupport;

  public constructor(options: { containerID: string }) {
    Cache.enabled = true;

    this.container = document.getElementById(options.containerID)!;

    this.uiManager = new UIManager(this);
    this.sceneManager = new SceneManager(this.container, this.uiManager);
    this.renderManager = new RenderManager(this.container, this.sceneManager);
    this.pdfCreator = new PDFCreator(this.renderManager, this.sceneManager);
    this.arSupport = new ARSupport(this.container, this.renderManager.getRenderer());
  }

  public setSoftMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.fabric, matFile);
  }

  public setHardMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.metal, matFile);
  }

  public setOtherMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.plastic, matFile);
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

  public getPDFCreator(): PDFCreator { return this.pdfCreator; }
}