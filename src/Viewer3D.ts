import { Component } from "./Chair";
import Debug from "./Debug";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;
  private debug: Debug | undefined;

  public constructor(options: { containerID: string }) {
    const container: HTMLElement = document.getElementById(options.containerID)!;

    this.sceneManager = new SceneManager();
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container);
    this.sceneManager.createOrbitControl(container);
    this.sceneManager.loadChairModel().then(() => this.debug = new Debug(this.sceneManager.getMyChair()!));
  }

  //debug
  public test(partName: string): void {
    //
  }
}