import { Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class SceneManager {

    private scene: Scene;
    private camera: PerspectiveCamera;

    constructor(container: HTMLElement, subject: Object3D | undefined) {
        this.scene = new Scene();
        this.camera = this.initCamera(subject);
        this.initOrbitControl(this.camera, container);
    }

    public getScene(): Scene {
        return this.scene;
    }

    public getCamera(): PerspectiveCamera {
        return this.camera;
    }

    /**
     * @param subject The object the camera will be facing when first loaded. Else look at world origin.
     */
    public initCamera(subject: Object3D | undefined): PerspectiveCamera {
        const camera: PerspectiveCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.addScalar(2);
        camera.lookAt(subject?.position ?? new Vector3());
        return camera;
    }

    public initOrbitControl(camera: PerspectiveCamera, container: HTMLElement): OrbitControls {
        const controls: OrbitControls = new OrbitControls(camera, container);
        controls.enableDamping = true;
        controls.dampingFactor = 1;
        return controls;
    }
}