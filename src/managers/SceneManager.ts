import { Camera, Color, DataTexture, DirectionalLight, EquirectangularReflectionMapping, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { chairConfig, files } from "../config/ChairConfig";
import Utility from "../generals/Utility";
import Chair from "../specifics/Chair";
import MatPicker from "../specifics/MatPicker";
import Part from "../specifics/Part";

export default class SceneManager {
    private scene: Scene;
    private camera: Camera;
    private frontRenderCamera!: Camera;
    private backRenderCamera!: Camera;
    private controls: OrbitControls;
    private cameraTarget: Vector3 = new Vector3(0, 0.7, 0);

    //undefined while dependencies are loading
    private chair: Chair | undefined;
    private matPicker: MatPicker | undefined;

    public constructor(container: HTMLElement, addDownloadEventToButton: () => void) {
        this.scene = new Scene();
        this.camera = this.setupCamera(container, new Vector3(0, 1, 2.2), this.cameraTarget);
        this.frontRenderCamera = this.setupCamera(container, new Vector3(-1.2, 1.5, 1.5), this.cameraTarget);
        this.backRenderCamera = this.setupCamera(container, new Vector3(1.2, 0.1, -1.5), this.cameraTarget);

        this.controls = this.initOrbitControl(container);
        this.addLights();

        Utility.loadModel(`models/${files.chairModel}`)
            .then((model) => {
                this.scene.add(model);
                this.chair = this.mapModelToChair(model);
                this.matPicker = new MatPicker(this.chair);
                addDownloadEventToButton(); //requires chair object
            });

        Utility.loadModel(`models/${files.environmentModel}`)
            .then((model) => { this.scene.add(model); });

        Utility.loadHDR(`models/${files.hdri}`)
            .then((hdri) => { this.setupHDRI(hdri); });
    }

    private setupHDRI(hdri: DataTexture) {
        hdri.mapping = EquirectangularReflectionMapping;
        this.scene.environment = hdri;
        this.scene.background = hdri;
        this.scene.environmentIntensity = 0.2;
    }

    private addLights(): void {
        const dirLight1: DirectionalLight = new DirectionalLight(0xffffff, 0.2);
        dirLight1.position.set(-3, 1.5, 1.5);
        const dirLight2: DirectionalLight = new DirectionalLight(0xffffff, 0.2);
        dirLight2.position.set(-3, 1.5, -1.5);

        this.scene.add(dirLight1, dirLight2);
    }

    private initOrbitControl(domElement: HTMLElement): OrbitControls {
        const controls: OrbitControls = new OrbitControls(this.camera, domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 1.3;
        controls.target = new Vector3(0, 0.75, 0);
        controls.maxDistance = 3.5;
        controls.minDistance = 1;
        controls.maxPolarAngle = 1.77;
        return controls;
    }

    private initCamera(domElement: HTMLElement): PerspectiveCamera {
        const aspectRatio: number = domElement.clientWidth / domElement.clientHeight;
        const camera: PerspectiveCamera = new PerspectiveCamera(50, aspectRatio, 0.1, 10);
        return camera;
    }

    private setupCamera(domElement: HTMLElement, camPosition: Vector3, camTarget: Vector3): Camera {
        const cam: Camera = this.initCamera(domElement);
        cam.position.copy(camPosition);
        cam.lookAt(camTarget);
        return cam;
    }

    private mapModelToChair(chairModel: Object3D): Chair {
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

        const base: Part = new Part(chairModel, chairConfig.fixed[0]);

        const legs: Part[] = [leg01, leg02, leg03];
        const seats: Part[] = [seat01, seat02];
        const backs: Part[] = [back01, back02];
        const arms: Part[] = [arm01, arm02, arm03];
        const fixed: Part[] = [base];

        return new Chair(legs, seats, backs, arms, fixed);
    }

    public getScene(): Scene { return this.scene; }

    public getCamera(): Camera { return this.camera; }

    public getControls(): OrbitControls { return this.controls; }

    public getChair(): Chair | undefined { return this.chair; }

    public getMatPicker(): MatPicker | undefined { return this.matPicker; }

    public getFrontRenderCamera(): Camera { return this.frontRenderCamera; }

    public getBackRenderCamera(): Camera { return this.backRenderCamera; }
}