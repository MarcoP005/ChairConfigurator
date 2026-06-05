import { Cache } from "three";
import { Component, MaterialType } from "./generals/Enums";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";
import { Script } from "./Script";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;
  private script: Script;

  public constructor(options: { containerID: string }) {
    Cache.enabled = true;
    const container: HTMLElement = document.getElementById(options.containerID)!;

    this.sceneManager = new SceneManager(container);
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container, this.sceneManager.getControls());

    this.script = new Script(this);
    this.script.initScripts();
    // new LilGUI(this);
  }

  public SetSoftMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.Soft, matFile);
  }

  public SetHardMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.Hard, matFile);
  }

  public SetOtherMat(matFile: string): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.Other, matFile);
  }

  public SetLeg(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.leg, partName);
  }

  public SetSeat(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.seat, partName);
  }

  public SetBack(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.back, partName);
  }

  public SetArm(partName: string): void {
    this.sceneManager.getChair()?.setPart(Component.arm, partName);
  }

  public ToggleAutoRotate(toggle: boolean): void {
    this.sceneManager.getControls().autoRotate = toggle;
  }

  public ToggleLights(toggle: boolean): void {
    this.sceneManager.getScene().environmentIntensity = toggle ? 0.2 : 0;
  }
}