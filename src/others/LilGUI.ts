// import { chairConfig, files } from "../config/ChairConfig";
// import Viewer3D from "../Viewer3D";
// import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";


// /**
//  * Old debugging class.
//  */

// export default class LilGUI {

//     private gui: GUI = new GUI();

//     public constructor(viewer: Viewer3D) {

//         const matFolder: GUI = this.gui.addFolder("Materials");
//         const partFolder: GUI = this.gui.addFolder("Parts");

//         const legOptions: string[] = chairConfig.components.legs.map(ipart => ipart.name);
//         const seatOptions: string[] = chairConfig.components.seats.map(ipart => ipart.name);
//         const backOptions: string[] = chairConfig.components.backs.map(ipart => ipart.name);
//         const armOptions: string[] = chairConfig.components.arms.map(ipart => ipart.name);
//         const softMatOptions: string[] = files.softMaterials;
//         const hardMatOptions: string[] = files.hardMaterials;
//         const otherMatOptions: string[] = files.otherMaterials;

//         const objectPart: {
//             leg: string,
//             seat: string,
//             back: string,
//             arm: string
//         } = {
//             leg: legOptions[0],
//             seat: seatOptions[0],
//             back: backOptions[0],
//             arm: armOptions[0]
//         };

//         const objectMaterial: {
//             softMaterial: string,
//             hardMaterial: string,
//             otherMaterial: string
//         } = {
//             softMaterial: softMatOptions[0],
//             hardMaterial: hardMatOptions[0],
//             otherMaterial: otherMatOptions[0]
//         };

//         partFolder.add(objectPart, "leg", legOptions)
//             .name("Leg")
//             .onChange((selected) => { viewer.setLeg(selected); });

//         partFolder.add(objectPart, "seat", seatOptions)
//             .name("Seat")
//             .onChange((selected) => { viewer.setSeat(selected); });

//         partFolder.add(objectPart, "back", backOptions)
//             .name("Back")
//             .onChange((selected) => { viewer.setBack(selected); });

//         partFolder.add(objectPart, "arm", armOptions)
//             .name("Arm")
//             .onChange((selected) => { viewer.setArm(selected); });


//         matFolder.add(objectMaterial, "softMaterial", softMatOptions)
//             .name("Soft")
//             .onChange((selected) => { viewer.setSoftMat(selected); });

//         matFolder.add(objectMaterial, "hardMaterial", hardMatOptions)
//             .name("Hard")
//             .onChange((selected) => { viewer.setHardMat(selected); });

//         matFolder.add(objectMaterial, "otherMaterial", otherMatOptions)
//             .name("Other")
//             .onChange((selected) => { viewer.setOtherMat(selected); });
//     }
// }
