/// <reference types="@ragempcommunity/types-server" />

declare const SilentError: ErrorConstructor

declare namespace NodeJS {
    interface Global {
        SilentError: typeof SilentError
    }
}

type PositionEx = {
    x: number
    y: number
    z: number
}

type PositionExR = {
    x: number
    y: number
    z: number
    r: number
}

type VehicleColor = {
    x: number
    y: number
}

type PaymentType = 'bank' | 'cash' | 'coins'

type TransactionType = 'deposit' | 'withdraw'

type InventoryItem = {
    cell: number
    name: string
    amount: number
    data?: { [name: string]: any }
}

type FactionVehicle = {
    id: string
    model: string
    plate: string
    position: PositionExR
    color: VehicleColor
    spawned: boolean
    taked: string
    takedAt: string
}

type InventoryCapacity = {
    cells: number
    slots: number
}

interface EventMpPool {
    subscribe(
        events: { [name: string]: (player: Player, ...args) => any },
        authorized?: boolean,
    ): void
    subscribeToDefault(
        events: { [name: string]: (...args) => void },
        authorized?: boolean,
    ): void
    reject(reason: any): Promise<Error>
}
interface PlayerMpPool {
    get(player: PlayerMp | number): Player
    getByUUID(id: number): Player
    delete(id: number): void

    toCustomArray(authorized?: boolean): Player[]
    withTimeout(player: PlayerMp, callback: Function, duration: number): void
    callInStream(position: Vector3, event: string, args: any)
}

interface VehicleMpPool {
    getById(id: number): VehicleMp
    authorize(vehicle: VehicleMp, uuid: number): void
    delete(vehicle: VehicleMp): void
}

interface ColshapeHandlers {
    keyName?: string
    onEnter?: (player: Player, data?: any) => void
    onKeyPress?: (player: Player, data?: any) => void
    onExit?: (player: Player, data?: any) => void
}

interface ColshapeMp {
    visible: boolean
    in?: Set<Player>
}

interface ColshapeMpPool {
    getData(player: PlayerMp): any
    create(
        position: PositionEx,
        radius: number,
        handlers: ColshapeHandlers,
        options?: {
            dimension?: number
            visible?: boolean
            data?: any
        },
    ): ColshapeMp
    delete(colshape: ColshapeMp): void
}

interface PickupMpPool {
    create(
        player: Player,
        position: PositionEx,
        dimension: number,
        item: InventoryItem,
    ): void
}

type BlipsOptions = {
    name: string
    color: number
    model: number
    scale?: number
    dimension?: number
    shortRange?: boolean
    minimapOnly?: boolean
}

interface BlipMpPool {
    create(
        position: PositionEx,
        options: BlipsOptions,
        player?: Player,
    ): BlipMp | undefined
    createForPlayer(
        player: Player,
        position: PositionEx,
        options: BlipsOptions,
        id?: string,
    ): void
    createForPlayerMinimap(
        player: Player,
        position: PositionEx,
        options: BlipsOptions,
        id?: string,
    ): void
    delete(player: Player, blip: BlipMp | string): void
}

interface Point {
    readonly id: number
    position: Vector3
    dimension: number
    visible: boolean

    isPointWithin(point: Vector3): boolean
    showFor(player: PlayerMp): void
    hideFor(player: PlayerMp): void
    destroy(): void
}
