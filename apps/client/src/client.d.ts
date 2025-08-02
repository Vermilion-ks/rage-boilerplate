/// <reference types="@ragempcommunity/types-client" />

type PositionEx = {
	x: number;
	y: number;
	z: number;
};

interface Mp {
	game1: Mp["game"];
}

interface EventMpPool {
	subscribe(events: { [name: string]: (...args) => unknown }): void;
	subscribeToDefault(events: { [name: string]: (...args) => void }): void;
	subscribeToData(
		events: {
			[name: string]: (
				entity: EntityMp,
				data: unknown,
				oldData: unknown,
			) => void;
		},
		stream?: boolean,
	): void;

	callServer(
		event: string,
		args?: unknown,
		pending?: boolean,
	): Promise<unknown>;
	callBrowser(
		event: string,
		args?: unknown,
		pending?: boolean,
		browser?: BrowserMp,
	): Promise<unknown>;
	reject(error: unknown): Promise<unknown>;
}

interface BrowserMpPool {
	readonly hud: boolean;

	showPage(
		page: string,
		data?: { [name: string]: unknown },
		cursor?: boolean,
		freeze?: boolean,
	): void;
	hidePage(page?: string): void;
	setHideBind(handler: () => void, key?: string): void;
	handlerChatInput(handler: () => void, key?: string): void;
}

interface CameraMpPool {
	readonly gameplay: CameraMp;

	getOffset(position: Vector3, angle: number, dist: number): Vector3;
	set(
		position: Vector3,
		rotation: Vector3,
		point: PositionEx,
		fov: number,
		easing?: number,
	): void;
	setToPlayer(
		offset: Vector3,
		point: Vector3,
		dist: number,
		angle?: number,
		fov?: number,
		easing?: number,
	): void;
	reset(easing?: number): void;
}

interface StorageMp {
	data: StorageState;
	update: (data: { [K in keyof StorageState]?: StorageState[K] }) => void;
}

interface PlayerMp {
	isListening: boolean;
	dbId: number;
	inventory: [];
	objects?: {
		[id: number]: ObjectMp;
	};
	scenario?: string;
	oxygen?: number;
	firewater?: number;
}

interface VehicleMp {
	objects?: {
		[id: number]: ObjectMp;
	};
}

interface GamePlayerMp {
	setWeaponDefenseModifier(modifier: number): void;
}

interface ColshapeMp {
	greenZone?: string;
}

interface ObjectMp {
	systemResolve?: (object: ObjectMp) => void;
	isInStreamRange: boolean;
}

interface ObjectMpPool {
	create(
		model: number,
		position: Vector3,
		options?: ObjectOptions,
	): Promise<ObjectMp>;
}

type ObjectOptions = {
	alpha?: number;
	dimension?: number;
	rotation?: Vector3;
};

interface NotificationMp {
	show(
		type: "success" | "info" | "warn" | "error",
		message: string,
		inMenu?: boolean,
	): void;
	help(message: string): void;
}

type Attachment = {
	model: number | string;
	bone: string | number;
	offset: Vector3;
	rotation: Vector3;
};

interface AttachmentsMp {
	register(id: number | string, data: Attachment): void;
	addFor(entity: PlayerMp | VehicleMp, id: number): Promise<void>;
	removeFor(entity: PlayerMp | VehicleMp, id: number): void;
}

interface AnimationsMp {
	play(player: PlayerMp, animation: string): void;
	stop(player: PlayerMp, animation: string): void;
}

interface GameUiMp {
	notifications: NotificationMp;
}

interface Mp {
	attachments: AttachmentsMp;
	animations: AnimationsMp;
}

interface ColshapeHandlers {
	onEnter?: (data?: unknown) => void;
	onKeyPress?: (data?: unknown) => void;
	onExit?: (data?: unknown) => void;
}

interface ColshapeMpPool {
	create(
		position: Vector3,
		radius: number,
		handlers: ColshapeHandlers,
		data?: unknown,
		dimension?: number,
	): ColshapeMp;
	destroy(colshape: ColshapeMp): void;
	getData(colshape?: ColshapeMp): unknown;
}
