import rpc from "rage-rpc";
import { isArray } from "lodash";

class Events {
	constructor() {
		mp.events.subscribe = this.subscribe;
		mp.events.reject = this.reject;
	}

	subscribe(events: { [name: string]: (...args: unknown[]) => unknown }) {
		for (const [name, callback] of Object.entries(events)) {
			rpc.register(name, (data: unknown[]) => {
				return isArray(data) ? callback(...data) : callback(data);
			});
		}
	}

	reject(error: unknown) {
		return new Promise((resolve, reject) => setTimeout(() => reject(error), 1));
	}
}

export default new Events();
