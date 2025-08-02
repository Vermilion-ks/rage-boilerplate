import rpc from "rage-rpc";
import { isArray } from "lodash";

class Events {
	constructor() {
		mp.events.subscribe = this.subscribe;
		mp.events.subscribeToData = this.subscribeToData;
		mp.events.callServer = this.callServer;
		mp.events.callBrowser = this.callBrowser;
		mp.events.reject = this.reject;
	}

	subscribe(events: { [name: string]: (...args: unknown[]) => unknown }) {
		for (const [name, callback] of Object.entries(events)) {
			rpc.register(name, (data: unknown[]) => {
				return isArray(data) ? callback(...data) : callback(data);
			});
		}
	}

	subscribeToData(
		events: {
			[name: string]: (
				entity: EntityMp,
				data: unknown,
				oldData?: unknown,
			) => void;
		},
		stream = true,
	) {
		for (const [name, callback] of Object.entries(events)) {
			mp.events.addDataHandler(
				name,
				(entity: EntityMp, data: unknown, oldData?: unknown) => {
					if (
						!stream ||
						(stream &&
							entity.handle &&
							mp.game.entity.isAnEntity(entity.handle))
					) {
						callback(entity, data, oldData);
					}
				},
			);
		}
	}

	reject(error: unknown) {
		return new Promise((resolve, reject) => setTimeout(() => reject(error), 1));
	}

	async callServer(event: string, args?: unknown, pending = true) {
		const promise = rpc.callServer(event, args, { noRet: !pending });

		if (pending) {
			const response = await promise;

			return response?.err ? this.reject(response.err) : response;
		}
	}

	async callBrowser(
		event: string,
		args?: unknown,
		pending = true,
		browser?: BrowserMp,
	) {
		const promise = rpc.callBrowser(browser ?? mp.browsers.at(0), event, args, {
			noRet: !pending,
		});

		if (pending) {
			const response = await promise;

			return response?.err ? this.reject(response.err) : response;
		}
	}
}

export default new Events();
