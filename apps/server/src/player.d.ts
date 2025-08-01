/// <reference types="@ragempcommunity/types-server" />

interface PlayerMp {
    colshape?: number
    colshapes: number[]
    colshapeIds: Set<number>
    attachments: number[]
}

interface Player {
    readonly mp: PlayerMp
    uuid: number
    performing: boolean
}
