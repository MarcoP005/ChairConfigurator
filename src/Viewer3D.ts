import { ChairPart } from "./Chair";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;

  public constructor(options: { containerID: string }) {
    const container: HTMLElement = document.getElementById(options.containerID)!;

    this.sceneManager = new SceneManager();
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container);
    this.sceneManager.createOrbitControl(container);
    this.sceneManager.loadChairModel();
  }

  //debug
  public test(i: number): void {
    this.sceneManager.getMyChair()?.setMaterial(i);
  }
}
