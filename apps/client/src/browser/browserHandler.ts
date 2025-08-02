import rpc from "rage-rpc";

class BrowserHandler {
	public browser: BrowserMp;
	constructor() {
		this.initialize();
		mp.events.subscribe({
			"Browser-Notification": this.handleNotification.bind(this),
		});
	}

	private initialize() {
		this.browser = mp.browsers.new("package://cef/index.html");
		mp.events.add("browserDomReady", (browser) => {
			rpc.callBrowser(browser, "Browser-ShowPage", { page: "/auth", args: [] });
			mp.gui.cursor.visible = true;
		});
	}

	private handleNotification(args: { type: string; message: string }) {
		rpc.callBrowser(this.browser, "Browser-Notification", {
			type: args.type,
			message: args.message,
		});
	}
}

export const browserHandler = new BrowserHandler();
