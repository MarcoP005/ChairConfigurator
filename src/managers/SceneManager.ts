import { Camera, Color, DirectionalLight, DirectionalLightHelper, Object3D, PerspectiveCamera, Scene } from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import Chair from "../Chair";
import ChairJSON from "../chair_config.json";
import Part from "../Part";
import { chairConfig } from "../ChairConfig";
import { Components } from "../Interfaces";

export default class SceneManager {

    private scene: Scene;
    private camera: Camera;
    private chairModel: Object3D | undefined;
    private gltfLoader: GLTFLoader;
    private myChair: Chair | undefined; //undefined while model is loading

    public constructor() {
        this.scene = new Scene();
        this.scene.background = new Color(0x242424);
        this.camera = this.initCamera();
        this.addLights();
        this.gltfLoader = new GLTFLoader();
    }

    public addLights(): void {
        const directionalLight: DirectionalLight = new DirectionalLight();
        directionalLight.position.set(2, 2, 2);
        const directionalLight2: DirectionalLight = new DirectionalLight();
        directionalLight2.position.set(-2, -2, -2);
        const dirLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight);
        const dirLight2Helper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight2);
        this.scene.add(directionalLight, dirLightHelper, directionalLight2, dirLight2Helper);
    }

    public getMyChair(): Chair | undefined {
        return this.myChair;
    }

    public getChairModel(): Object3D | undefined {
        return this.chairModel;
    }

    public createOrbitControl(domElement: HTMLElement): void {
        const controls: OrbitControls = new OrbitControls(this.camera, domElement);
    }

    public getScene(): Scene {
        return this.scene;
    }

    public getCamera(): Camera {
        return this.camera;
    }

    public initCamera(): PerspectiveCamera {
        const camera: PerspectiveCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 2.2;
        return camera;
    }

    public async loadChairModel(): Promise<void> {
        const chairGLTF: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${ChairJSON.src}`);
        this.chairModel = chairGLTF.scene;
        this.scene.add(this.chairModel);
        this.myChair = this.modelToChair(this.chairModel);
    }

    private modelToChair(chairModel: Object3D): Chair {
        const leg01: Part = new Part(chairModel, chairConfig.components.leg[0]);
        const leg02: Part = new Part(chairModel, chairConfig.components.leg[1]);
        const leg03: Part = new Part(chairModel, chairConfig.components.leg[2]);

        const seat01: Part = new Part(chairModel, chairConfig.components.seat[0]);
        const seat02: Part = new Part(chairModel, chairConfig.components.seat[1]);

        const back01: Part = new Part(chairModel, chairConfig.components.back[0]);
        const back02: Part = new Part(chairModel, chairConfig.components.back[1]);

        const arm01: Part = new Part(chairModel, chairConfig.components.arm[0]);
        const arm02: Part = new Part(chairModel, chairConfig.components.arm[1]);
        const arm03: Part = new Part(chairModel, chairConfig.components.arm[2]);

        const base: Part = new Part(chairModel, chairConfig.others[0]);

        const legs: Part[] = [leg01, leg02, leg03];
        const seats: Part[] = [seat01, seat02];
        const backs: Part[] = [back01, back02];
        const arms: Part[] = [arm01, arm02, arm03];

        return new Chair(legs, seats, backs, arms, base);
    }
}