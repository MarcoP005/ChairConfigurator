import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Chair from "./Chair";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";


export class Viewer3D {

  private sceneManager: SceneManager;
  private renderManager: RenderManager;

  public constructor(options: { containerID: string }) {

    const container: HTMLElement = document.getElementById(options.containerID)!;
    this.sceneManager = new SceneManager(container, undefined);
    this.renderManager = new RenderManager(container, this.sceneManager);

    const chair: Chair = new Chair(this.sceneManager, this.renderManager);

    const gui: GUI = new GUI();
    gui.add(chair.getSelected(), "legs", chair.getParts("legs")!).name("Legs");
    gui.add(chair.getSelected(), "seat", chair.getParts("seat")!).name("Seat");
    gui.add(chair.getSelected(), "back", chair.getParts("back")!).name("Back");
    gui.add(chair.getSelected(), "arms", chair.getParts("arms")!).name("Arms");

    window.addEventListener('resize', () => this.onWindowResize(), false);

  }

  private onWindowResize() {
    this.sceneManager.getCamera().aspect = window.innerWidth / window.innerHeight;
    this.sceneManager.getCamera().updateProjectionMatrix();
    this.renderManager.getRenderer().setSize(window.innerWidth, window.innerHeight);
  }
}
