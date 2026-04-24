import { WebGLRenderer } from "three";
import SceneManager from "./SceneManager";


export default class RenderManager {

    private sceneManager: SceneManager;
    private renderer: WebGLRenderer;

    constructor(container: HTMLElement, sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
        this.renderer = this.createRenderer(container);

        this.startRender();
    }

    private createRenderer(container: HTMLElement): WebGLRenderer {
        const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
        container.appendChild(renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        return renderer;
    }
    private startRender(): void {
        this.render();
    }

    private render(): void {
        console.log("render");
        this.renderer.render(this.sceneManager.getScene(), this.sceneManager.getCamera());
        window.requestAnimationFrame(() => this.render());
    }

}