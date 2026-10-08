import { env } from "#/libs/server/env";

const log = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.log(...args);
	}
};

const info = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.info(...args);
	}
};

const warn = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.warn(...args);
	}
};

const error = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.error(...args);
	}
};

export const server = {
	log,
	info,
	warn,
	error,
};
