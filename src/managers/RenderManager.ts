import jsPDF from "jspdf";
import { Camera, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class RenderManager {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: Camera;
    private orbitControls: OrbitControls;
    private container: HTMLElement;

    public constructor(scene: Scene, camera: Camera, container: HTMLElement, controls: OrbitControls) {
        this.renderer = this.initRenderer(container);
        this.camera = camera;
        this.scene = scene;
        this.orbitControls = controls;
        this.container = container;

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

    public saveRenderToPdf(pdf: jsPDF, frontCamera: Camera, backCamera: Camera): void {
        const width: number = this.container.clientWidth;
        const height: number = this.container.clientHeight;

        this.renderer.render(this.scene, frontCamera);
        const imgDataFront: string = this.renderer.domElement.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgDataFront, "JPEG", 40, 30, width / 8.5, height / 8.5);

        this.renderer.render(this.scene, backCamera);
        const imgDataBack: string = this.renderer.domElement.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgDataBack, "JPEG", 40, 112, width / 8.5, height / 8.5);
    }
}