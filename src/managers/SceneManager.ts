import { Camera, Color, DirectionalLight, DirectionalLightHelper, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import ChairJSON from "../chair_config.json";
import Chair from "../Chair";
import Part from "../Part";

export default class SceneManager {

    private scene: Scene;
    private camera: Camera;
    private chairModel: Object3D | undefined;
    private gltfLoader: GLTFLoader;
    private myChair: Chair | undefined; //undefined while model is loading
    public myMaterials: MeshStandardMaterial[] = [
        new MeshStandardMaterial({ color: 0x00ffff }),
        new MeshStandardMaterial({ color: 0xffff00 }),
        new MeshStandardMaterial({ color: 0xff00ff })
    ];

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

    public setMyChair(myChair: Chair): void {
        this.myChair = myChair;
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
        camera.position.z = 2;
        return camera;
    }

    public async loadModelAsync(): Promise<void> {
        const chairGLTF: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${ChairJSON.src}`);
        this.chairModel = chairGLTF.scene;
        this.scene.add(this.chairModel);
        this.modelToChair(this.chairModel);
    }

    public modelToChair(chairModel: Object3D): Chair {
        const legs01: Part = new Part(chairModel, ChairJSON.components.legs[0] as unknown as { name: string, mesh: string[] });
        const legs02: Part = new Part(chairModel, ChairJSON.components.legs[1] as unknown as { name: string, mesh: string[] });
        const legs03: Part = new Part(chairModel, ChairJSON.components.legs[2] as unknown as { name: string, mesh: string[] });

        const seat01: Part = new Part(chairModel, ChairJSON.components.seat[0] as unknown as { name: string, mesh: string[] });
        const seat02: Part = new Part(chairModel, ChairJSON.components.seat[1] as unknown as { name: string, mesh: string[] });

        const back01: Part = new Part(chairModel, ChairJSON.components.back[0] as unknown as { name: string, mesh: string[] });
        const back02: Part = new Part(chairModel, ChairJSON.components.back[1] as unknown as { name: string, mesh: string[] });

        const arms01: Part = new Part(chairModel, ChairJSON.components.arms[0] as unknown as { name: string, mesh: string[] });
        const arms02: Part = new Part(chairModel, ChairJSON.components.arms[1] as unknown as { name: string, mesh: string[] });
        const arms03: Part = new Part(chairModel, ChairJSON.components.arms[2] as unknown as { name: string, mesh: string[] });

        const legs: Part[] = [legs01, legs02, legs03];
        const seats: Part[] = [seat01, seat02];
        const backs: Part[] = [back01, back02];
        const arms: Part[] = [arms01, arms02, arms03];

        return new Chair(legs, seats, backs, arms);
    }
}