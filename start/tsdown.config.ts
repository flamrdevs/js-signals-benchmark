import { defineConfig } from "tsdown";

export default defineConfig({
	entry: "src/start.ts",
	format: "esm",
	target: "esnext",
	platform: "node",
	external: ["bun:jsc", "@mitata/counters"],
	define: {
		"process.env.NODE_ENV": `"production"`,
	},
	minify: true,
	dts: false,
	clean: true,
});
