import { Camera, Color, DirectionalLight, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import Chair from "../Chair";
import { chairConfig, files } from "../ChairConfig";
import Part from "../Part";

export default class SceneManager {

    private scene: Scene;
    private camera: Camera;
    private controls: OrbitControls;

    private gltfLoader: GLTFLoader;
    private chairModel: Object3D | undefined;
    private myChair: Chair | undefined; //undefined while model is loading

    public constructor(container: HTMLElement) {
        this.scene = new Scene();
        this.scene.background = new Color(0x242424);
        this.camera = this.initCamera();
        this.controls = this.initOrbitControl(container);
        this.addLights();

        this.gltfLoader = new GLTFLoader();
        this.loadModel(files.chairModel)
            .then((model) => {
                this.myChair = this.modelToChair(model);
            });
    }

    public addLights(): void {
        const dl: DirectionalLight = new DirectionalLight();
        dl.position.setScalar(2);
        const dl2: DirectionalLight = new DirectionalLight();
        dl2.position.setScalar(-2);
        this.scene.add(dl, dl2);
    }

    public getControls(): OrbitControls {
        return this.controls;
    }

    public getMyChair(): Chair | undefined {
        return this.myChair;
    }

    public getChairModel(): Object3D | undefined {
        return this.chairModel;
    }

    public initOrbitControl(domElement: HTMLElement): OrbitControls {
        const controls: OrbitControls = new OrbitControls(this.camera, domElement);
        controls.autoRotate = true;
        controls.enableDamping = true;
        controls.target = new Vector3(0, 0.75, 0);
        controls.dampingFactor = 1.3;
        controls.maxDistance = 6;
        controls.minDistance = 1;
        controls.maxPolarAngle = 1.9;
        return controls;
    }

    public getScene(): Scene {
        return this.scene;
    }

    public getCamera(): Camera {
        return this.camera;
    }

    public initCamera(): PerspectiveCamera {
        const camera: PerspectiveCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 1, 2.2);
        return camera;
    }

    public async loadModel(file: string): Promise<Object3D> {
        const chairGLTF: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${file}`);
        this.scene.add(chairGLTF.scene);
        return chairGLTF.scene;
    }

    /**
     * Map 3d model to Chair and Part type
     */
    private modelToChair(chairModel: Object3D): Chair {

        const leg01: Part = new Part(chairModel, chairConfig.components.legs[0]);
        const leg02: Part = new Part(chairModel, chairConfig.components.legs[1]);
        const leg03: Part = new Part(chairModel, chairConfig.components.legs[2]);

        const seat01: Part = new Part(chairModel, chairConfig.components.seats[0]);
        const seat02: Part = new Part(chairModel, chairConfig.components.seats[1]);

        const back01: Part = new Part(chairModel, chairConfig.components.backs[0]);
        const back02: Part = new Part(chairModel, chairConfig.components.backs[1]);

        const arm01: Part = new Part(chairModel, chairConfig.components.arms[0]);
        const arm02: Part = new Part(chairModel, chairConfig.components.arms[1]);
        const arm03: Part = new Part(chairModel, chairConfig.components.arms[2]);

        const base: Part = new Part(chairModel, chairConfig.others[0]);

        const legs: Part[] = [leg01, leg02, leg03];
        const seats: Part[] = [seat01, seat02];
        const backs: Part[] = [back01, back02];
        const arms: Part[] = [arm01, arm02, arm03];

        return new Chair(legs, seats, backs, arms, base);
    }
}