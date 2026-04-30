import { Camera, Color, DirectionalLight, DirectionalLightHelper, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import ChairJSON from "../chair_config.json";
import { Component } from "../Component";
import Chair from "../Chair";
import Part from "../Part";

export type Version = {
    name: string,
    mesh: string[],
    component: Component
}

export default class SceneManager {

    private scene: Scene;
    private camera: Camera;
    private chairModel: Object3D | undefined;
    private gltfLoader: GLTFLoader;
    private allVersion: Version[] = [];
    public myMaterials: MeshStandardMaterial[] = [
        new MeshStandardMaterial({ color: 0x00ffff }),
        new MeshStandardMaterial({ color: 0xffff00 }),
        new MeshStandardMaterial({ color: 0xff00ff })
    ];

    private chair: Chair | undefined;

    public constructor() {
        this.scene = new Scene();
        this.scene.background = new Color(0x242424);
        this.camera = this.initCamera();

        const directionalLight: DirectionalLight = new DirectionalLight();
        directionalLight.position.set(2, 2, 2);
        const directionalLight2: DirectionalLight = new DirectionalLight();
        directionalLight2.position.set(-2, -2, -2);
        const dirLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight);
        const dirLight2Helper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight2);
        this.scene.add(directionalLight, dirLightHelper, directionalLight2, dirLight2Helper);

        this.gltfLoader = new GLTFLoader();
    }

    public selectPart(selectedVersionName: string, component: Component): void {
        switch (component) {
            case Component.legs:
                //hide all legs specifically
                this.chairModel?.children.forEach(allMesh => {
                    ChairJSON.components.legs.forEach(legsOnlyMesh => {
                        legsOnlyMesh.mesh.forEach(element => {
                            if (allMesh.name === element) {
                                allMesh.visible = false;
                            }
                        });
                    });
                });

                //show only selected legs
                this.chairModel?.children.forEach(allMesh => {
                    this.allVersion.forEach(version => {
                        if (version.name === selectedVersionName) {
                            version.mesh.forEach(selectedVersionMesh => {
                                if (selectedVersionMesh === allMesh.name)
                                    allMesh.visible = true;
                            });
                        }
                    });
                });
                break;
        }
    }

    public selectMaterial(index: number, component: Component): void {
        //same cycles of selectPart()
        this.chairModel?.children.forEach(allMesh => {
            ChairJSON.components.legs.forEach(legsOnlyMesh => {
                legsOnlyMesh.mesh.forEach(element => {
                    if (allMesh.name === element)
                        (allMesh as Mesh).material = this.myMaterials[index];
                });
            });
        });
    }

    public initChair(): void {
        const legs1Mesh: string[] = ChairJSON.components.legs[0].mesh;
        const seat1Mesh: string[] = ChairJSON.components.seat[0].mesh;
        const back1Mesh: string[] = ChairJSON.components.back[0].mesh;
        const arms1Mesh: string[] = ChairJSON.components.arms[0].mesh;

        ChairJSON.components.legs.forEach(element => {
            const v: Version = { name: "", mesh: [], component: Component.legs };
            v.name = element.name;
            v.mesh = element.mesh;
            this.allVersion.push(v);
        });
        ChairJSON.components.seat.forEach(element => {
            const v: Version = { name: "", mesh: [], component: Component.seat };
            v.name = element.name;
            v.mesh = element.mesh;
            this.allVersion.push(v);
        });
        ChairJSON.components.back.forEach(element => {
            const v: Version = { name: "", mesh: [], component: Component.back };
            v.name = element.name;
            v.mesh = element.mesh;
            this.allVersion.push(v);
        });
        ChairJSON.components.arms.forEach(element => {
            const v: Version = { name: "", mesh: [], component: Component.arms };
            v.name = element.name;
            v.mesh = element.mesh;
            this.allVersion.push(v);
        });
        console.log(this.allVersion);

        this.chairModel?.children.forEach((modelPart) => {
            if (!ChairJSON.components.base.includes(modelPart.name))
                modelPart.visible = false;
        });

        this.chairModel?.children.forEach(modelPart => {
            legs1Mesh.forEach(element => {
                if (modelPart.name === element) {
                    modelPart.visible = true;
                }
            });
            seat1Mesh.forEach(element => {
                if (modelPart.name === element) {
                    modelPart.visible = true;
                }
            });
            back1Mesh.forEach(element => {
                if (modelPart.name === element) {
                    modelPart.visible = true;
                }
            });
            arms1Mesh.forEach(element => {
                if (modelPart.name === element) {
                    modelPart.visible = true;
                }
            });
        });
    }

    public createOrbitControl(domElement: HTMLElement): void {
        const controls: OrbitControls = new OrbitControls(this.camera, domElement);
    }

    public getScene(): Scene {
        return this.scene;
    }

    public getCamera(): Camera {
        return this.camera;
    }

    public initCamera(): PerspectiveCamera {
        const camera: PerspectiveCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 2;
        return camera;
    }

    public async loadModelAsync(): Promise<void> {
        const chairGLTF: GLTF = await this.gltfLoader.loadAsync(`assets/viewer3d-static/${ChairJSON.src}`);
        this.chairModel = chairGLTF.scene;
        this.scene.add(this.chairModel);


        this.initChairData(this.chairModel);
    }

    private initChairDataTemp(): void {

        // this.chair = {
        //     legs: [],
        //     seat: [],
        //     back: [],
        //     arms: []
        // };

        // this.initPart("legs");

        // ChairJSON.components.legs.forEach(leg => {
        //     // console.log(leg);
        //     const legMeshes: Mesh[] = [];
        //     leg.meshes.forEach(element => {
        //         // console.log(element);
        //         const legMesh: Object3D | undefined = this.chairModel?.children.find((c) => c.name === element);
        //         if (legMesh && legMesh instanceof Mesh) {
        //             // console.log(legMesh);
        //             legMeshes.push(legMesh);
        //         }
        //     });
        //     // console.log(legParts);
        //     const part: Part = {
        //         name: leg.name,
        //         meshes: legMeshes
        //     };
        //     this.chair?.legs.push(part);
        // });
        // console.log(this.chair);
    }

    private initChairData(chairModel: Object3D): void {
        const legs01: Part = new Part(chairModel, ChairJSON.components.legs[0] as unknown as { name: string, mesh: string[]});
        const legs02: Part = new Part(chairModel, ChairJSON.components.legs[1] as unknown as { name: string, mesh: string[]});
        const legs03: Part = new Part(chairModel, ChairJSON.components.legs[2] as unknown as { name: string, mesh: string[]});
        // this.chair = new Chair();
    }
}