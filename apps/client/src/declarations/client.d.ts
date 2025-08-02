/// <reference types="@ragempcommunity/types-client" />

interface Mp {
	game1: Mp["game"];
}

interface EventMpPool {
	subscribe(events: { [name: string]: (...args) => unknown }): void;
	reject(error: unknown): Promise<unknown>;
}

interface PlayerMp {
	uuid: number;
}
