import { AmbientLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import chair from "./chair_config.json";
import SceneManager from './managers/SceneManager';
import RenderManager from './managers/RenderManager';

// export interface PartConfig {
//     partName: string,
//     materialName: string
// }

export interface ChairConfig {
    legs: string,
    seat: string,
    back: string,
    arms: string
}

export default class Chair {

    private selected: ChairConfig;

    private legsNames: string[] = [];
    private seatNames: string[] = [];
    private backNames: string[] = [];
    private armsNames: string[] = [];

    public constructor(sceneManager: SceneManager, renderManager: RenderManager) {

        type component = {
            name: string;
            mesh: string[];
        };

        const allComponents: component[] = [];
        chair.components.legs.forEach(element => {
            const c: component = { name: element.name, mesh: element.mesh };
            allComponents.push(c);
        });

        //gui.add will accept arrays of simple types only


        chair.components.legs.forEach(element => {
            this.legsNames.push(element.name);
        });
        chair.components.seat.forEach(element => {
            this.seatNames.push(element.name);
        });
        chair.components.back.forEach(element => {
            this.backNames.push(element.name);
        });
        chair.components.arms.forEach(element => {
            this.armsNames.push(element.name);
        });

        this.selected = {
            legs: this.legsNames[0],
            seat: this.seatNames[0],
            back: this.backNames[0],
            arms: this.armsNames[0]
        };


        const gltfLoader: GLTFLoader = new GLTFLoader();

        gltfLoader.load(
            "assets/viewer3d-static/chair.glb",
            (data) => {
                data.scene.children.forEach(element => {
                    if (element instanceof Mesh) {
                        element.material = new MeshStandardMaterial();
                        if (element.name.localeCompare(this.selected.legs)) {
                            // element.visible = false;
                        }
                    }
                });
                sceneManager.getScene().add(data.scene);
            }
        );

        const ambientLight: AmbientLight = new AmbientLight();
        sceneManager.getScene().add(ambientLight);
    }

    public getSelected(): ChairConfig {
        return this.selected;
    }

    public getParts(partName: string): string[] | undefined {

        switch (partName) {
            case "legs":
                return this.legsNames;
            case "seat":
                return this.seatNames;
            case "back":
                return this.backNames;
            case "arms":
                return this.armsNames;
            default:
                console.log(`Sorry.`);
        }

    }

}