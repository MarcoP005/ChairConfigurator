import { Camera, Scene, WebGLRenderer } from "three";

/**
 * General class to manage renderer-related functionalities.
 */
export default class RenderManager {

    public initRenderer(container: HTMLElement): WebGLRenderer {
        const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
        container.appendChild(renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        return renderer;
    }

    public loopRender(renderer: WebGLRenderer, scene: Scene, camera: Camera): void {
        renderer.render(scene, camera);
        window.requestAnimationFrame(() => this.loopRender(renderer, scene, camera));
    }
}