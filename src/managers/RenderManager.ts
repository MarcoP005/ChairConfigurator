import { Camera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export default class RenderManager {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: Camera;
    private orbitControls: OrbitControls;

    // private stats: Stats = new Stats(); //debug

    public constructor(scene: Scene, camera: Camera, container: HTMLElement, controls: OrbitControls) {
        this.renderer = this.initRenderer(container);
        this.camera = camera;
        this.scene = scene;
        this.orbitControls = controls;

        window.addEventListener('resize', () => this.onWindowResize());
        this.loopRender();

        // document.body.appendChild(this.stats.dom); //debug
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

    public loopRender(): void {
        // this.stats.begin(); //debug

        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(() => this.loopRender());

        // this.stats.end(); //debug
    }

}