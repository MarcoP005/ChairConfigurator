import { Camera, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export default class RenderManager {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: Camera;

    public constructor(scene: Scene, camera: Camera, container: HTMLElement) {
        this.renderer = this.initRenderer(container);
        this.camera = camera;
        this.scene = scene;
        window.addEventListener('resize', () => this.onWindowResize());
        this.loopRender(this.scene, camera);
    }

    private onWindowResize() {
        if (this.camera instanceof PerspectiveCamera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public initRenderer(container: HTMLElement): WebGLRenderer {
        const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
        container.appendChild(renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        return renderer;
    }

    public loopRender(scene: Scene, camera: Camera): void {
        this.renderer.render(scene, camera);
        window.requestAnimationFrame(() => this.loopRender(scene, this.camera));
    }

}