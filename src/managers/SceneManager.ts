import { Camera, ColorRepresentation, DataTexture, DirectionalLight, EquirectangularReflectionMapping, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Mapper from "../generals/Mapper";
import Utility from "../generals/Utility";
import Chair from "../others/Chair";
import { files } from "../others/ChairConfig";
import MatPicker from "../others/MatPicker";
import UIManager from "./UIManager";
import PDFCreator from "../others/PDFCreator";

export default class SceneManager {
    private scene: Scene;
    private camera: Camera;
    private frontRenderCamera: Camera;
    private backRenderCamera: Camera;
    private controls: OrbitControls;
    private cameraTarget: Vector3 = new Vector3(0, 0.75, 0);

    //undefined while dependencies are loading
    private chair: Chair | undefined;
    private environment!: Object3D;
    private matPicker: MatPicker | undefined;

    public constructor(container: HTMLElement) {
        this.scene = new Scene();

        this.camera = this.setupCamera(container, new Vector3(0, 1, 2.2), this.cameraTarget);
        this.frontRenderCamera = this.setupCamera(container, new Vector3(-1.2, 1.5, 1.5), this.cameraTarget);
        this.backRenderCamera = this.setupCamera(container, new Vector3(1.2, 0.1, -1.5), this.cameraTarget);

        this.controls = this.initOrbitControl(container);
        this.addLights();

        Utility.loadModel(`models/${files.chairModel}`)
            .then((model) => {
                this.scene.add(model);
                this.chair = Mapper.mapModelToChair(model);
                this.matPicker = new MatPicker(this.chair!);
                // ???.addDownloadEvent(); //requires chair object
            });

        Utility.loadModel(`models/${files.environmentModel}`)
            .then((model) => {
                this.scene.add(model);
                this.environment = model;
            });

        Utility.loadHDR(`models/${files.hdri}`)
            .then((hdri) => {
                this.setupHDRI(hdri);
            });
    }

    private setupHDRI(hdri: DataTexture): void {
        hdri.mapping = EquirectangularReflectionMapping;
        this.scene.environment = hdri;
        this.scene.background = hdri;
        this.scene.environmentIntensity = 0.2;
    }

    private addLights(): void {
        const intensity: number = 0.2;
        const color: ColorRepresentation = 0xffffff;

        const dirLight1: DirectionalLight = new DirectionalLight(color, intensity);
        dirLight1.position.set(-3, 1.5, 1.5);
        const dirLight2: DirectionalLight = new DirectionalLight(color, intensity);
        dirLight2.position.set(-3, 1.5, -1.5);

        this.scene.add(dirLight1, dirLight2);
    }

    private initOrbitControl(domElement: HTMLElement): OrbitControls {
        const controls: OrbitControls = new OrbitControls(this.camera, domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 1.3;
        controls.target = this.cameraTarget;
        controls.maxDistance = 3.5;
        return controls;
    }

    private setupCamera(domElement: HTMLElement, camPosition: Vector3, camTarget: Vector3): Camera {
        const cam: Camera = this.initCamera(domElement);
        cam.position.copy(camPosition);
        cam.lookAt(camTarget);
        return cam;
    }

    private initCamera(domElement: HTMLElement): PerspectiveCamera {
        const aspectRatio: number = domElement.clientWidth / domElement.clientHeight;
        const camera: PerspectiveCamera = new PerspectiveCamera(50, aspectRatio, 0.001, 20);
        return camera;
    }

    public getScene(): Scene { return this.scene; }

    public getCamera(): Camera { return this.camera; }

    public getControls(): OrbitControls { return this.controls; }

    public getChair(): Chair | undefined { return this.chair; }

    public getMatPicker(): MatPicker | undefined { return this.matPicker; }

    public getFrontRenderCamera(): Camera { return this.frontRenderCamera; }

    public getBackRenderCamera(): Camera { return this.backRenderCamera; }

    public getEnvironment(): Object3D { return this.environment; }
}