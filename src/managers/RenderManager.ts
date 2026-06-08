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

    public saveRenderToPdf(): void {
        const width: number = this.container.clientWidth;
        const height: number = this.container.clientHeight;
        const renderTarget: WebGLRenderTarget = new WebGLRenderTarget(width, height);
        const pdf: jsPDF = new jsPDF();

        this.renderer.setRenderTarget(renderTarget);
        this.renderer.render(this.scene, this.renderCamera);

        const pixels: Uint8Array = new Uint8Array(width * height * 4);
        this.renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixels);

        this.renderer.setRenderTarget(null);

        const tempCanvas: HTMLCanvasElement = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        const context: CanvasRenderingContext2D = tempCanvas.getContext("2d")!;
        const imageData: ImageData = context.createImageData(width, height);

        //flip canvas y and apply SRGB correction
        for (let y: number = 0; y < height; y++) {
            for (let x: number = 0; x < width; x++) {
                const src: number = ((height - y - 1) * width + x) * 4;
                const dst: number = (y * width + x) * 4;
                imageData.data[dst] = Math.pow(pixels[src] / 255, 1 / 2.2) * 255;
                imageData.data[dst + 1] = Math.pow(pixels[src + 1] / 255, 1 / 2.2) * 255;
                imageData.data[dst + 2] = Math.pow(pixels[src + 2] / 255, 1 / 2.2) * 255;
                imageData.data[dst + 3] = pixels[src + 3];
            }
        }

        context.putImageData(imageData, 0, 0);

        const imgData: string = tempCanvas.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgData, "JPEG", 20, 20, width/10, height/10);
        pdf.save("render.pdf");

        renderTarget.dispose();
    }
}