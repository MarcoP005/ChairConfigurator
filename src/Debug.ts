import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import ChairJSON from "./chair_config.json";
import SceneManager from './managers/SceneManager';
import { Component } from './Component';
import { MeshStandardMaterial } from 'three';

export default class Debug {

    private sceneManager: SceneManager;

    public static selectedComp: { selectedLegs: string, selectedSeat: string, selectedBack: string, selectedArms: string } =
        {
            selectedLegs: "",
            selectedSeat: "",
            selectedBack: "",
            selectedArms: ""
        };
    public static selectedMat: { matIndex: number } = {
        matIndex: 0
    };

    private gui: GUI = new GUI();

    private legs: string[] = [];
    private seat: string[] = [];
    private back: string[] = [];
    private arms: string[] = [];

    constructor(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
        ChairJSON.components.legs.forEach(element => {
            this.legs.push(element.name);
        });
        ChairJSON.components.seat.forEach(element => {
            this.seat.push(element.name);
        });
        ChairJSON.components.back.forEach(element => {
            this.back.push(element.name);
        });
        ChairJSON.components.arms.forEach(element => {
            this.arms.push(element.name);
        });
        Debug.selectedComp.selectedLegs = this.legs[0];
        Debug.selectedComp.selectedSeat = this.seat[0];
        Debug.selectedComp.selectedBack = this.back[0];
        Debug.selectedComp.selectedArms = this.arms[0];

        this.gui.add(Debug.selectedComp, "selectedLegs", this.legs).name("Legs").onChange(() => this.sceneManager.selectPart(Debug.selectedComp.selectedLegs, Component.legs));
        this.gui.add(Debug.selectedComp, "selectedSeat", this.seat).name("Seat");
        this.gui.add(Debug.selectedComp, "selectedBack", this.back).name("Back");
        this.gui.add(Debug.selectedComp, "selectedArms", this.arms).name("Arms");
        this.gui.add(Debug.selectedMat, "matIndex", 0, this.sceneManager.myMaterials.length-1, 1).onChange(() => this.sceneManager.selectMaterial(Debug.selectedMat.matIndex, Component.legs));
    }
}