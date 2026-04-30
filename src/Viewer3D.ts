import { Component } from "./Component";
import Debug from "./Debug";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;

  public constructor(options: { containerID: string }) {
    //main

    const container: HTMLElement = document.getElementById(options.containerID)!;

    this.sceneManager = new SceneManager();
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container);
    this.sceneManager.createOrbitControl(container);
    this.sceneManager.loadModelAsync().then(() => {
      this.sceneManager.initChair();
      this.sceneManager.selectMaterial(0, Component.legs);
    });

    const UIDebug: Debug = new Debug(this.sceneManager);
  }

  public test(index: number): void {
    this.sceneManager.selectMaterial(index, Component.legs);
  }
}
