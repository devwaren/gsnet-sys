import { env } from "#/libs/server/env";

const logs = "[server] ";

const log = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.log(...args);
	}
};

const info = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.info(logs, ...args);
	}
};

const warn = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.warn(logs, ...args);
	}
};

const error = (...args: unknown[]) => {
	if (!env.server.isProd) {
		console.error(logs, ...args);
	}
};

export const server = {
	log,
	info,
	warn,
	error,
};
