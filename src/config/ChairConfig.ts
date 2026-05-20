import { MaterialType } from "../generals/Enums";
import { IChairConfig, IFiles } from "../generals/Interfaces";

export const files: IFiles = {
    chairModel: "chair.glb",
    softMaterials: [
        "poplin.glb",
        "leather.glb",
        "cloth.glb"
    ],
    hardMaterials: [
        "metal.glb"
    ],
    otherMaterials: [
        "metal.glb"
    ]
};

export const chairConfig: IChairConfig = {
    components: {
        legs: [
            {
                name: "leg_01",
                meshes: [
                    {
                        name: "Rays",
                        materials: MaterialType.Hard
                    },
                    {
                        name: "Wheels",
                        materials: MaterialType.Other
                    }
                ]
            },
            {
                name: "leg_02",
                meshes: [
                    {
                        name: "Tulip",
                        materials: MaterialType.Hard
                    }
                ]
            },
            {
                name: "leg_03",
                meshes: [
                    {
                        name: "Cantilever",
                        materials: MaterialType.Hard
                    }
                ]
            }
        ],
        seats: [
            {
                name: "seat_01",
                meshes: [
                    {
                        name: "SquareSeat",
                        materials: MaterialType.Soft
                    }
                ]
            },
            {
                name: "seat_02",
                meshes: [
                    {
                        name: "RoundSeat",
                        materials: MaterialType.Soft
                    }
                ]
            }
        ],
        backs: [
            {
                name: "back_01",
                meshes: [
                    {
                        name: "SquareBack",
                        materials: MaterialType.Soft
                    }
                ]
            },
            {
                name: "back_02",
                meshes: [
                    {
                        name: "RoundBack",
                        materials: MaterialType.Soft
                    }
                ]
            }
        ],
        arms: [
            {
                name: "arm_01",
                meshes: [
                    {
                        name: "Curve",
                        materials: MaterialType.Hard
                    },
                    {
                        name: "CurveArmRests",
                        materials: MaterialType.Soft
                    }
                ]
            },
            {
                name: "arm_02",
                meshes: [
                    {
                        name: "Straight",
                        materials: MaterialType.Hard
                    },
                    {
                        name: "StraightArmRests",
                        materials: MaterialType.Soft
                    }
                ]
            },
            {
                name: "arm_03",
                meshes: [
                    {
                        name: "Lateral",
                        materials: MaterialType.Hard
                    },
                    {
                        name: "LateralArmRests",
                        materials: MaterialType.Soft
                    }
                ]
            }
        ]
    },
    fixed: [
        {
            name: "base",
            meshes: [
                {
                    name: "BaseSeat",
                    materials: MaterialType.Other
                },
                {
                    name: "BaseBack",
                    materials: MaterialType.Other
                }
            ]
        }
    ]
};