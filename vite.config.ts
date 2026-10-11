import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

const ignoreUseClientWarnings = (): Plugin => ({
	name: "ignore-use-client-directive-warnings",
	apply: "build",
	configResolved(config) {
		const originalWarn = config.logger.warn;

		config.logger.warn = (msg, options) => {
			if (
				typeof msg === "string" &&
				msg.includes("[MODULE_LEVEL_DIRECTIVE]") &&
				msg.includes('"use client"')
			) {
				return;
			}

			originalWarn(msg, options);
		};
	},
});

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		ignoreUseClientWarnings(),
		devtools(),
		nitro({
			rollupConfig: {
				external: [/^@sentry\//],
			},
		}),
		tailwindcss(),
		tanstackStart({
			router: {
				generatedRouteTree: "gen/index.ts",
			},
		}),
		viteReact(),
	],
	server: {
		port: 3000,
	},
});
