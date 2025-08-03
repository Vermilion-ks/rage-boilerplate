import { build } from "esbuild";
import copyStaticFiles from "esbuild-copy-static-files";

async function buildServer() {
	await build({
		platform: "node",
		entryPoints: ["./apps/server/src/index.ts"],
		outfile: "./server/packages/server/index.js",
		bundle: true,
		format: "cjs",
		target: "node14",
		plugins: [
			copyStaticFiles({
				src: "./node_modules/@prisma/client",
				dest: "./server/node_modules/.prisma/client",
			}),
			copyStaticFiles({
				src: "./.env",
				dest: "./server/.env",
			}),
		],
		external: [
			"@prisma/client",
			"prisma",
			".prisma/client",
			"esbuild-copy-static-files",
		],
	});
	console.log("[Server] Build finished");
}

async function buildClient() {
	await build({
		entryPoints: ["./apps/client/src/index.ts"],
		outfile: "./server/client_packages/index.js",
		bundle: true,
		platform: "browser",
		format: "esm",
	});
	console.log("[Client] Build finished");
}

async function main() {
	await buildClient();
	await buildServer();
}

main();
