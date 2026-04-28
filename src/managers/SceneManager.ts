import { Camera, Color, DirectionalLight, Object3D, PerspectiveCamera, Scene } from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import ChairJSON from "../chair_config.json";

export default class SceneManager {

    private scene: Scene;
    private camera: Camera;
    private chairModel: Object3D | undefined;

    public constructor() {
        this.scene = new Scene();
        this.scene.background = new Color(0xff66ff);
        this.camera = this.initCamera();
        const ambientLight: DirectionalLight = new DirectionalLight();
        this.scene.add(ambientLight);
    }

    public initChair(): void {
        const leg1Parts: string[] = ["Pole001", "Wheel001", "Wheel002", "Wheel003", "Wheel004", "Wheel005"];
        this.chairModel?.children.forEach((modelPart) => {
            modelPart.visible = false;
        });
        this.chairModel?.traverse((modelPart) => {
            leg1Parts.forEach(element => {
                if (modelPart.name === element) {
                    modelPart.visible = true;
                }
            });
        });
        console.log(this.chairModel);
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
        camera.position.z = 2;
        return camera;
    }

    public async initViewer(): Promise<void> {
        const chairGLTF: GLTF = await this.loadModel(`assets/viewer3d-static/${ChairJSON.src}`);
        this.chairModel = chairGLTF.scene;
        this.scene.add(this.chairModel);
        console.log(this.chairModel);
    }

    private async loadModel(src: string): Promise<GLTF> {
        const gltfLoader: GLTFLoader = new GLTFLoader();
        return await gltfLoader.loadAsync(src);
    }
}