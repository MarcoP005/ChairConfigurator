import Debug from "./Debug";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;
  private debug: Debug | undefined;

  public constructor(options: { containerID: string }) {
    const container: HTMLElement = document.getElementById(options.containerID)!;

    this.sceneManager = new SceneManager(container);
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container, this.sceneManager.getControls());
    this.sceneManager.initOrbitControl(container);
    this.sceneManager.loadChairModel().then(() => this.debug = new Debug(this.sceneManager.getMyChair()!));
  }

  //debug
  public test(): void {
    console.log("test");
  }
}
