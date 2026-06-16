import { Camera, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import SceneManager from "./SceneManager";
import Utility from "../generals/Utility";

export default class RenderManager {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: Camera;
    private orbitControls: OrbitControls;
    private container: HTMLElement;

    public constructor(container: HTMLElement, sceneManager: SceneManager) {
        this.container = container;
        this.scene = sceneManager.getScene();
        this.camera = sceneManager.getCamera();
        this.orbitControls = sceneManager.getControls();
        this.renderer = this.initRenderer();
        Utility.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

        window.addEventListener('resize', () => this.onWindowResize());
        this.loopRender();
    }

    private onWindowResize() {
        if (this.camera instanceof PerspectiveCamera) {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
        }
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    private initRenderer(): WebGLRenderer {
        const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
        this.container.appendChild(renderer.domElement);
        renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = SRGBColorSpace;
        return renderer;
    }

    private loopRender(): void {
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(() => this.loopRender());
    }

    public getRenderer(): WebGLRenderer {
        return this.renderer;
    }
}