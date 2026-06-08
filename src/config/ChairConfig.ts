import { MaterialType } from "../generals/Enums";
import { IChairConfig, IFiles } from "../generals/Interfaces";

export const files: IFiles = {
    chairModel: "chair.glb",
    environmentModel: "office.glb",
    hdri: "skybox.hdr",
    softMaterials: [
        "poplin.glb",
        "leather.glb",
        "cloth.glb"
    ],
    hardMaterials: [
        "metal.glb",
        "reflective.glb"
    ],
    otherMaterials: [
        "reflective.glb",
        "metal.glb"
    ]
};

export const chairConfig: IChairConfig = {
    components: {
        backs: [
            {
                name: "square",
                meshes: [
                    {
                        name: "SquareBack",
                        materials: MaterialType.Soft
                    }
                ]
            },
            {
                name: "round",
                meshes: [
                    {
                        name: "RoundBack",
                        materials: MaterialType.Soft
                    }
                ]
            }
        ],
        seats: [
            {
                name: "square",
                meshes: [
                    {
                        name: "SquareSeat",
                        materials: MaterialType.Soft
                    }
                ]
            },
            {
                name: "round",
                meshes: [
                    {
                        name: "RoundSeat",
                        materials: MaterialType.Soft
                    }
                ]
            }
        ],
        legs: [
            {
                name: "wheels",
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
                name: "tulip",
                meshes: [
                    {
                        name: "Tulip",
                        materials: MaterialType.Hard
                    }
                ]
            },
            {
                name: "cantilever",
                meshes: [
                    {
                        name: "Cantilever",
                        materials: MaterialType.Hard
                    }
                ]
            }
        ],
        arms: [
            {
                name: "curve",
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
                name: "straight",
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
                name: "lateral",
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