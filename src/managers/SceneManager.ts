import { Camera, Color, DirectionalLight, Material, Mesh, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import Chair from "../Chair";
import { chairConfig } from "../ChairConfig";
import Part from "../Part";

export default class SceneManager {

    private scene: Scene;
    private camera: Camera;
    private chairModel: Object3D | undefined;
    private gltfLoader: GLTFLoader;
    private myChair: Chair | undefined; //undefined while model is loading
    private controls: OrbitControls;


    public constructor(container: HTMLElement) {
        this.scene = new Scene();
        this.scene.background = new Color(0x242424);
        this.camera = this.initCamera();
        this.controls = this.initOrbitControl(container);
        this.addLights();
        this.gltfLoader = new GLTFLoader();
    }

    public addLights(): void {
        const directionalLight: DirectionalLight = new DirectionalLight();
        directionalLight.position.set(2, 2, 2);
        const directionalLight2: DirectionalLight = new DirectionalLight();
        directionalLight2.position.set(-2, -2, -2);
        this.scene.add(directionalLight, directionalLight2);
    }

    public getControls(): OrbitControls{
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
        controls.dampingFactor = 1.3;
        controls.enableDamping = true;
        controls.maxDistance = 6;
        controls.minDistance = 1;
        controls.target = new Vector3(0,0.15,0);
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
        camera.position.z = 2.2;
        return camera;
    }

    public async loadChairModel(): Promise<void> {
        const chairGLTF: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${chairConfig.modelFile}`);
        this.chairModel = chairGLTF.scene;
        this.scene.add(this.chairModel);
        this.myChair = this.modelToChair(this.chairModel);
        this.loadChairMaterials();
    }

    public async loadChairMaterials(): Promise<void> {
        for (const file of chairConfig.materialsFiles.inner) {
            const gltf: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/materials/${file}`);
            this.myChair?.innerMats.push((gltf.scene.children[0] as Mesh).material as Material);
        }
        for (const file of chairConfig.materialsFiles.outer) {
            const gltf: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/materials/${file}`);
            this.myChair?.outerMats.push((gltf.scene.children[0] as Mesh).material as Material);
        }
    }

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