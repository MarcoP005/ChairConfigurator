import { MaterialType } from "./Enums";
import { IChairConfig, IFiles } from "./Interfaces";

export const files: IFiles = {
    chairModel: "chair.glb",
    softMaterials: [
        "poplin.glb",
        "leather.glb",
        "cloth.glb"
    ],
    hardMaterials: [
        "metal.glb",
        "plaster.glb"
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
                        materials: MaterialType.Hard,
                        occlusionMap: "SelfOcclusion_Rays.png" //removable
                    },
                    {
                        name: "Wheels",
                        materials: MaterialType.Other,
                        occlusionMap: "SelfOcclusion_Wheels.png"
                    }
                ]
            },
            {
                name: "leg_02",
                meshes: [
                    {
                        name: "Tulip",
                        materials: MaterialType.Hard,
                        occlusionMap: "SelfOcclusion_Tulip.png"
                    }
                ]
            },
            {
                name: "leg_03",
                meshes: [
                    {
                        name: "Cantilever",
                        materials: MaterialType.Hard,
                        occlusionMap: "SelfOcclusion_Cantilever.png"
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
                        materials: MaterialType.Soft,
                        occlusionMap: "SelfOcclusion_SquareSeat.png"
                    }
                ]
            },
            {
                name: "seat_02",
                meshes: [
                    {
                        name: "RoundSeat",
                        materials: MaterialType.Soft,
                        occlusionMap: "SelfOcclusion_RoundSeat.png"
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
                        materials: MaterialType.Soft,
                        occlusionMap: "SelfOcclusion_SquareBack.png"
                    }
                ]
            },
            {
                name: "back_02",
                meshes: [
                    {
                        name: "RoundBack",
                        materials: MaterialType.Soft,
                        occlusionMap: "SelfOcclusion_RoundBack.png"
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
                        materials: MaterialType.Hard,
                        occlusionMap: "SelfOcclusion_Curve.png"
                    },
                    {
                        name: "CurveArmRests",
                        materials: MaterialType.Soft,
                        occlusionMap: "SelfOcclusion_Curve.png"
                    }
                ]
            },
            {
                name: "arm_02",
                meshes: [
                    {
                        name: "Straight",
                        materials: MaterialType.Hard,
                        occlusionMap: "SelfOcclusion_Straight.png"
                    },
                    {
                        name: "StraightArmRests",
                        materials: MaterialType.Soft,
                        occlusionMap: "SelfOcclusion_Straight.png"
                    }
                ]
            },
            {
                name: "arm_03",
                meshes: [
                    {
                        name: "Lateral",
                        materials: MaterialType.Hard,
                        occlusionMap: "SelfOcclusion_Lateral.png"
                    },
                    {
                        name: "LateralArmRests",
                        materials: MaterialType.Soft,
                        occlusionMap: "SelfOcclusion_Lateral.png"
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
                    materials: MaterialType.Other,
                    occlusionMap: "SelfOcclusion_BaseSeat.png"
                },
                {
                    name: "BaseBack",
                    materials: MaterialType.Other,
                    occlusionMap: "SelfOcclusion_BaseBack.png"
                }
            ]
        }
    ]
};