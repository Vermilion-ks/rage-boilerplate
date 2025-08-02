import { context } from "esbuild";
import chokidar from "chokidar";
import filelocPluginModule from "esbuild-plugin-fileloc";

const { filelocPlugin } = filelocPluginModule;

const logSuccess = (name) => {
	console.log(`✅ ${name} rebuilt at ${new Date().toLocaleTimeString()}`);
};

const logError = (name, error) => {
	console.error(`❌ ${name} rebuild failed:\n`, error);
};

const reload = () => {
	console.log("🔄 Reloading server...");
};

// biome-ignore lint/style/useDefaultParameterLast: <explanation>
async function watchTarget(name, entry, out, opts = {}, watchPath) {
	const ctx = await context({
		entryPoints: [entry],
		bundle: true,
		outfile: out,
		sourcemap: "inline",
		...opts,
	});

	await ctx.rebuild();
	logSuccess(name);

	console.log(`👀 Watching ${name}...`);

	chokidar
		.watch(watchPath, { ignored: /node_modules/ })
		.on("change", async (filePath) => {
			console.log(`🔄 ${name} change detected: ${filePath}`);
			try {
				await ctx.rebuild();
				logSuccess(name);
				reload();
			} catch (e) {
				logError(name, e);
			}
		});
}

await watchTarget(
	"Server",
	"./apps/server/src/index.ts",
	"./server/packages/server/index.js",
	{
		platform: "node",
		target: "node14",
		format: "cjs",
		bundle: true,
		plugins: [filelocPlugin()],
		external: [
			"@prisma/client",
			"prisma",
			".prisma/client",
			"esbuild-copy-static-files",
		],
	},
	"./apps/server/src",
);

await watchTarget(
	"Client",
	"./apps/client/src/index.ts",
	"./server/client_packages/index.js",
	{
		platform: "browser",
		bundle: true,
		minify: true,
		format: "esm",
		plugins: [filelocPlugin()],
	},
	"apps/client/src",
);
