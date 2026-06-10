import { Camera, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class RenderManager {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: Camera;
    private orbitControls: OrbitControls;
    private container: HTMLElement;

    public constructor(container: HTMLElement, scene: Scene, camera: Camera, controls: OrbitControls) {
        this.container = container;
        this.scene = scene;
        this.camera = camera;
        this.orbitControls = controls;
        this.renderer = this.initRenderer();

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