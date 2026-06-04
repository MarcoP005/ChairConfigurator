import { Camera, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class RenderManager {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: Camera;
    private orbitControls: OrbitControls;

    public constructor(scene: Scene, camera: Camera, container: HTMLElement, controls: OrbitControls) {
        this.renderer = this.initRenderer(container);
        this.camera = camera;
        this.scene = scene;
        this.orbitControls = controls;

        window.addEventListener('resize', () => this.onWindowResize(container));
        this.loopRender();
    }

    private onWindowResize(container: HTMLElement) {
        if (this.camera instanceof PerspectiveCamera) {
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
        }
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    public initRenderer(container: HTMLElement): WebGLRenderer {
        const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
        container.appendChild(renderer.domElement);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = SRGBColorSpace;
        return renderer;
    }

    public loopRender(): void {
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(() => this.loopRender());
    }

}