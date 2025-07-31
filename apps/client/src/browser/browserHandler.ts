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
			setTimeout(() => {
				rpc.callBrowser(this.browser, "Browser-ShowPage", "/example");
			}, 10000);
			setTimeout(() => {
				rpc.callBrowser(this.browser, "Browser-ShowPage", "/");
			}, 15000);
		});
	}
}

export const browserHandler = new BrowserHandler();
