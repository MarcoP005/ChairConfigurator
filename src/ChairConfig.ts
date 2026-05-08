import { ChairConfig } from "./Interfaces";

export const chairConfig: ChairConfig = {
    modelFile: "chair.glb",
    components: {
        legs: [
            {
                name: "leg_01",
                meshes: [
                    "Pole",
                    "Rays",
                    "Wheels"
                ]
            },
            {
                name: "leg_02",
                meshes: [
                    "Pole",
                    "Tulip"
                ]
            },
            {
                name: "leg_03",
                meshes: [
                    "Cantilever"
                ]
            }
        ],
        seats: [
            {
                name: "seat_01",
                meshes: [
                    "SquareSeat"
                ]
            },
            {
                name: "seat_02",
                meshes: [
                    "RoundSeat"
                ]
            }
        ],
        backs: [
            {
                name: "back_01",
                meshes: [
                    "SquareBack"
                ]
            },
            {
                name: "back_02",
                meshes: [
                    "RoundBack"
                ]
            }
        ],
        arms: [
            {
                name: "arm_01",
                meshes: [
                    "ArmRests",
                    "Curve"
                ]
            },
            {
                name: "arm_02",
                meshes: [
                    "ArmRests",
                    "Straight"
                ]
            },
            {
                name: "arm_03",
                meshes: [
                    "ArmRests",
                    "Lateral"
                ]
            }
        ]
    },
    others: [
        {
            name: "base",
            meshes: [
                "BaseSeat",
                "BaseBack"
            ]
        }
    ],
    materialsFiles: {
        inner: [
            "fabric-Woodstock-Bianco-Cotone_T_WL213.glb"
        ],
        outer: [
            "Metallo_peltro.glb"
        ]
    }
};