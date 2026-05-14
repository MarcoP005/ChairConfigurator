import { Object3D } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

export default class Utility{
    private static  gltfLoader: GLTFLoader = new GLTFLoader();

    public static async loadModel(file: string): Promise<Object3D> {
        const gltf: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${file}`);
        return gltf.scene;
    }
}