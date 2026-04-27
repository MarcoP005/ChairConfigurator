import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import ChairJSON from "./chair_config.json";
import RenderManager from "./managers/RenderManager";
import SceneManager from "./managers/SceneManager";
import Debug from "./Debug";

export class Viewer3D {

  public constructor(options: { containerID: string }) {
    //main

    const container: HTMLElement = document.getElementById(options.containerID)!;

    const scene: Scene = new Scene();
    const sceneManager: SceneManager = new SceneManager();
    const camera: PerspectiveCamera = sceneManager.initCamera(undefined);
    const controls: OrbitControls = new OrbitControls(camera, container);
    const ambientLight: AmbientLight = new AmbientLight();

    const renderManager: RenderManager = new RenderManager();
    const renderer: WebGLRenderer = renderManager.initRenderer(container);

    sceneManager.loadModel(`assets/viewer3d-static/${ChairJSON.src}`, scene);
    scene.add(
      ambientLight,
      camera
    );

    const UIDebug: Debug = new Debug();

    // const gui: GUI = new GUI();
    // gui.add(chair.getSelected(), "legs", chair.getParts("legs")!).name("Legs");
    // gui.add(chair.getSelected(), "seat", chair.getParts("seat")!).name("Seat");
    // gui.add(chair.getSelected(), "back", chair.getParts("back")!).name("Back");
    // gui.add(chair.getSelected(), "arms", chair.getParts("arms")!).name("Arms");

    window.addEventListener('resize', () => this.onWindowResize(camera, renderer));
    renderManager.loopRender(renderer, scene, camera);
  }

  private onWindowResize(cameraToUpdate: PerspectiveCamera, rendererToUpdate: WebGLRenderer) {
    cameraToUpdate.aspect = window.innerWidth / window.innerHeight;
    cameraToUpdate.updateProjectionMatrix();
    rendererToUpdate.setSize(window.innerWidth, window.innerHeight);
  }
}
