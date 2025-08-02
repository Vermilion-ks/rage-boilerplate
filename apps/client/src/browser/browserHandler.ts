import rpc from "rage-rpc";

class BrowserHandler {
	public browser: BrowserMp;
	constructor() {
		this.initialize();
		mp.events.subscribe({
			"Browser-Notification": this.handleNotification.bind(this),
		});
	}

	private handleNotification(args: { type: string; message: string }) {
		mp.console.logInfo(
			`Notification: ${JSON.stringify(args.type)} - ${JSON.stringify(args.message)}`,
		);
		rpc.callBrowser(this.browser, "Browser-Notification", {
			type: args.type,
			message: args.message,
		});
	}
	private initialize() {
		this.browser = mp.browsers.new("package://cef/index.html");
		mp.events.add("browserDomReady", (browser) => {
			rpc.callBrowser(browser, "Browser-ShowPage", "/auth");
			mp.gui.cursor.visible = true;
		});
	}
}

export const browserHandler = new BrowserHandler();
