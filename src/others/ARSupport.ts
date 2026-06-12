import { Object3D, WebGLRenderer } from "three";
import { ARButton } from "three/examples/jsm/Addons.js";
import SceneManager from "../managers/SceneManager";
import RenderManager from "../managers/RenderManager";

export default class ARSupport {
    private renderManager: RenderManager;
    private sceneManager: SceneManager;
    private renderer: WebGLRenderer;
    private container: HTMLElement;

    public constructor(container: HTMLElement, renderManager: RenderManager, sceneManager: SceneManager) {
        this.renderManager = renderManager;
        this.sceneManager = sceneManager;
        this.renderer = renderManager.getRenderer();
        this.container = container;
        this.enableAR();
    }

    private enableAR() {
        this.container.appendChild(this.renderer.domElement);
        this.renderer.xr.enabled = true;

        const button: HTMLElement = this.container.appendChild(ARButton.createButton(this.renderer, {
            requiredFeatures: ['hit-test'] // required for placing objects on surfaces
        }));
        button.addEventListener("click", () => {
            const environment: Object3D = this.sceneManager.getEnvironment();
            environment.visible = false;
        });
    }
}