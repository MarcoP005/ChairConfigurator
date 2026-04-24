import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Chair from "./Chair";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";


export class Viewer3D {

  public constructor(options: { containerID: string }) {

    const container: HTMLElement = document.getElementById(options.containerID)!;
    const sceneManager: SceneManager = new SceneManager(container, undefined);
    const renderManager: RenderManager = new RenderManager(container, sceneManager);

    const chair: Chair = new Chair(sceneManager, renderManager);

    const gui: GUI = new GUI();
    gui.add(chair.getSelected(), "legs", chair.getParts("legs")!).name("Legs");
    gui.add(chair.getSelected(), "seat", chair.getParts("seat")!).name("Seat");
    gui.add(chair.getSelected(), "back", chair.getParts("back")!).name("Back");
    gui.add(chair.getSelected(), "arms", chair.getParts("arms")!).name("Arms");

  }

}
