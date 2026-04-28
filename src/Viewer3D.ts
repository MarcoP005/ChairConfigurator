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
    this.sceneManager.initViewer().then(() => this.initChair());

    const UIDebug: Debug = new Debug();
  }

  public initChair(): void{
    this.sceneManager.initChair();
  }
}
