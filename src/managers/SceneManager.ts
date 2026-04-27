import { Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

/**
 * General class to manage basic scene components and access scene-related functions.
 */
export default class SceneManager {

    /**
     * @param subject The object the camera will be facing when first loaded. Else look at world origin.
     */
    public initCamera(subject: Object3D | undefined): PerspectiveCamera {
        const camera: PerspectiveCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.addScalar(2);
        camera.lookAt(subject?.position ?? new Vector3());
        return camera;
    }

    public loadModel(src: string, scene: Scene): void {
        const gltfLoader: GLTFLoader = new GLTFLoader();

        gltfLoader.load(
            src,
            (data) => {
                data.scene.children.forEach(element => {
                    if (element instanceof Mesh)
                        element.material = new MeshStandardMaterial(); //temporary
                });
                scene.add(data.scene);
            }
        );
    }
}