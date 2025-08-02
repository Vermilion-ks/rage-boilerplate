/// <reference types="@ragempcommunity/types-server" />

declare const SilentError: ErrorConstructor

declare namespace NodeJS {
    interface Global {
        SilentError: typeof SilentError
    }
}

interface EventMpPool {
    subscribe(
        events: { [name: string]: (player: Player, ...args) => any }
    ): void
    reject(reason: any): Promise<Error>
}

interface PlayerMpPool {
    get(player: PlayerMp | number): Player
    getByUUID(id: number): Player
    delete(id: number): void
}
