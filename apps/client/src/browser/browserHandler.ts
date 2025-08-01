import rpc from "rage-rpc";

class BrowserHandler {
	public browser: BrowserMp;
	constructor() {
		this.initialize();
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
