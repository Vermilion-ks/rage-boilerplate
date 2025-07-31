class BrowserHandler {
	public browser: BrowserMp;
	constructor() {
		this.initialize();
	}

	private initialize() {
		this.browser = mp.browsers.new("package://cef/index.html");
	}
}

export const browserHandler = new BrowserHandler();
