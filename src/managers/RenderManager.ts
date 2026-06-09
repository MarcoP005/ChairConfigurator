import jsPDF from "jspdf";
import { Camera, PerspectiveCamera, RenderTarget, Scene, SRGBColorSpace, Texture, WebGLRenderer, WebGLRenderTarget } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class RenderManager {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: Camera;
    private renderCamera: Camera;
    private orbitControls: OrbitControls;
    private container: HTMLElement;

    public constructor(scene: Scene, camera: Camera, container: HTMLElement, controls: OrbitControls, renderCamera: Camera) {
        this.renderer = this.initRenderer(container);
        this.camera = camera;
        this.renderCamera = renderCamera;
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

    public saveRenderToPdf(pdf: jsPDF): void {
        const width: number = this.container.clientWidth;
        const height: number = this.container.clientHeight;
        this.renderer.render(this.scene, this.renderCamera);
        const imgData: string = this.renderer.domElement.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgData, "JPEG", 20, 35, width / 6.45, height / 6.45);
    }
}