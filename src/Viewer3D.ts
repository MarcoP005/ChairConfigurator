import { MaterialType } from "./Enums";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";

export class Viewer3D {
  private sceneManager: SceneManager;
  private renderManager: RenderManager;

  public constructor(options: { containerID: string }) {
    const container: HTMLElement = document.getElementById(options.containerID)!;

    this.sceneManager = new SceneManager(container);
    this.renderManager = new RenderManager(this.sceneManager.getScene(), this.sceneManager.getCamera(), container, this.sceneManager.getControls());
  }

  //debug
  public test(i: number): void {
    this.sceneManager.getMatPicker()?.setMaterial(MaterialType.Soft, i);
  }
}