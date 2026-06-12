import { MaterialType } from "../generals/Enums";
import { IChairConfig, IFiles } from "../generals/Interfaces";

export const files: IFiles = {
    chairModel: "chair.glb",
    environmentModel: "office.glb",
    hdri: "skybox.hdr",
    fabrics: [
        "raven.glb",
        "sand.glb",
        "beige.glb"
    ],
    metals: [
        "bright.glb",
        "dawn.glb",
        "dark.glb"
    ],
    plastics: [
        "black.glb",
        "grey.glb",
        "white.glb"
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
                        materials: MaterialType.fabric
                    }
                ]
            },
            {
                name: "round",
                meshes: [
                    {
                        name: "RoundBack",
                        materials: MaterialType.fabric
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
                        materials: MaterialType.fabric
                    }
                ]
            },
            {
                name: "round",
                meshes: [
                    {
                        name: "RoundSeat",
                        materials: MaterialType.fabric
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
                        materials: MaterialType.metal
                    },
                    {
                        name: "Wheels",
                        materials: MaterialType.plastic
                    }
                ]
            },
            {
                name: "tulip",
                meshes: [
                    {
                        name: "Tulip",
                        materials: MaterialType.metal
                    }
                ]
            },
            {
                name: "cantilever",
                meshes: [
                    {
                        name: "Cantilever",
                        materials: MaterialType.metal
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
                        materials: MaterialType.metal
                    },
                    {
                        name: "CurveArmRests",
                        materials: MaterialType.fabric
                    }
                ]
            },
            {
                name: "straight",
                meshes: [
                    {
                        name: "Straight",
                        materials: MaterialType.metal
                    },
                    {
                        name: "StraightArmRests",
                        materials: MaterialType.fabric
                    }
                ]
            },
            {
                name: "lateral",
                meshes: [
                    {
                        name: "Lateral",
                        materials: MaterialType.metal
                    },
                    {
                        name: "LateralArmRests",
                        materials: MaterialType.fabric
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
                    materials: MaterialType.plastic
                },
                {
                    name: "BaseBack",
                    materials: MaterialType.plastic
                }
            ]
        }
    ]
};