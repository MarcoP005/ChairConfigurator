import { ChairConfig } from "./Interfaces";

export const chairConfig: ChairConfig = {
    modelFile: "chair.glb",
    components: {
        leg: [
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
        seat: [
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
        back: [
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
        arm: [
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
    ]
};