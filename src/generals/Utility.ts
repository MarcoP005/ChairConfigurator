import { Object3D, Texture, TextureLoader } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

export default class Utility {
    private static gltfLoader: GLTFLoader = new GLTFLoader();
    private static textureLoader: TextureLoader = new TextureLoader();

    public static async loadModel(file: string): Promise<Object3D> {
        const gltf: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${file}`);
        return gltf.scene;
    }

    public static async loadTexture(file: string): Promise<Texture> {
        return await this.textureLoader.loadAsync(`assets/viewer3d-static/${file}`);
    }
}