import { WebGLRenderer } from "three";
import { ARButton } from "three/examples/jsm/Addons.js";

export default class ARSupport {
    private renderer: WebGLRenderer;
    private container: HTMLElement;

    public constructor(container: HTMLElement, renderer: WebGLRenderer) {
        this.renderer = renderer;
        this.container = container;
        this.enableAR();
    }

    private enableAR() {
        this.container.appendChild(this.renderer.domElement);
        this.renderer.xr.enabled = true;

        this.container.appendChild(ARButton.createButton(this.renderer, {
            requiredFeatures: ['hit-test'] // required for placing objects on surfaces
        }));
    }
}