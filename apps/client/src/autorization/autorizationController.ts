import rpc from "rage-rpc";
import { browserHandler } from "../browser/browserHandler";

class AutorizationController {
	constructor() {
		mp.events.subscribe({
			"Auth-SuccessLogin": this.handleSignIn.bind(this),
		});
	}

	private handleSignIn() {
		rpc.callBrowser(browserHandler.browser, "Browser-ShowPage", {
			page: "/",
			args: [],
		});
		mp.gui.cursor.visible = false;
	}
}

export const autorizationController = new AutorizationController();
