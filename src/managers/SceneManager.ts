import { AmbientLight, Camera, Color, DirectionalLight, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Chair from "../Chair";
import { chairConfig, files } from "../ChairConfig";
import MatPicker from "../MatPicker";
import Part from "../Part";
import Utility from "../Utility";

export default class SceneManager {

    private scene: Scene;
    private camera: Camera;
    private controls: OrbitControls;

    private chair: Chair | undefined; //undefined while model is loading
    private matPicker: MatPicker | undefined;

    public constructor(container: HTMLElement) {
        this.scene = new Scene();
        this.scene.background = new Color(0x242424);
        this.camera = this.initCamera();
        this.controls = this.initOrbitControl(container);
        this.addLights();

        Utility.loadModel(files.chairModel)
            .then((model) => {
                this.scene.add(model);
                this.chair = this.mapModelToChair(model);
                this.matPicker = new MatPicker(this.chair);
            });
    }

    //temporary
    private addLights(): void {
        const d1: DirectionalLight = new DirectionalLight();
        d1.position.set(0,2,0);
        const d2: DirectionalLight = new DirectionalLight();
        d2.position.set(0,-2,0);
        const d3: DirectionalLight = new DirectionalLight();
        d3.position.set(2,0,0);
        const d4: DirectionalLight = new DirectionalLight();
        d4.position.set(-2,0,0);
        const d5: DirectionalLight = new DirectionalLight();
        d5.position.set(0,0,2);
        const d6: DirectionalLight = new DirectionalLight();
        d6.position.set(0,0,-2);
        this.scene.add(d1,d2,d3,d4,d5,d6);
    }

    private initOrbitControl(domElement: HTMLElement): OrbitControls {
        const controls: OrbitControls = new OrbitControls(this.camera, domElement);
        controls.autoRotate = true;
        controls.enableDamping = true;
        controls.dampingFactor = 1.3;
        controls.target = new Vector3(0, 0.75, 0);
        controls.maxDistance = 6;
        controls.minDistance = 0.1;
        controls.maxPolarAngle = 1.9;
        return controls;
    }

    public initCamera(): PerspectiveCamera {
        const camera: PerspectiveCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.far = 4;
        camera.near = 0.001;
        camera.position.set(0, 1, 2.2);
        return camera;
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
}