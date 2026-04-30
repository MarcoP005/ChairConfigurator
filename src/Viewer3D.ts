import Debug from "./Debug";
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
    this.sceneManager.loadModelAsync()
      .then(() => {
        this.sceneManager.setMyChair(this.sceneManager.modelToChair(this.sceneManager.getChairModel()!));
      });

    const UIDebug: Debug = new Debug(this.sceneManager);
  }

  //debug
  public test(partName: string): void {
    console.log(this.sceneManager.getMyChair()?.setPart(partName));
  }
}
