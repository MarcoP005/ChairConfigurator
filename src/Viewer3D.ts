import { chairConfig } from "./ChairConfig";
import DebugGUI from "./DebugGUI";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;
  private debug: DebugGUI | undefined;

  public constructor(options: { containerID: string }) {
    const container: HTMLElement = document.getElementById(options.containerID)!;

    this.sceneManager = new SceneManager(container);
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container, this.sceneManager.getControls());
    this.sceneManager.loadModel(chairConfig.modelFile).then(() => this.debug = new DebugGUI(this.sceneManager.getMyChair()!));
  }

  //debug
  public test(): void {
    //
  }
}