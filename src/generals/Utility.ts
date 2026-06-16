import { DataTexture, Object3D, Texture, TextureLoader } from "three";
import { GLTF, GLTFLoader, HDRLoader } from "three/examples/jsm/Addons.js";

export default class Utility {
    private static gltfLoader: GLTFLoader = new GLTFLoader();
    private static textureLoader: TextureLoader = new TextureLoader();
    private static hdrloader = new HDRLoader();
    public static maxAnisotropy: number;

    public static async loadModel(file: string): Promise<Object3D> {
        const gltf: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${file}`);
        return gltf.scene;
    }

    public static async loadTexture(file: string): Promise<Texture> {
        return await this.textureLoader.loadAsync(`assets/viewer3d-static/${file}`);
    }

    public static async loadHDR(file: string): Promise<DataTexture> {
        return await this.hdrloader.loadAsync(`assets/viewer3d-static/${file}`);
    }
}