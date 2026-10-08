import { envClient } from "#/libs/client/env";

const log = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.log(...args);
	}
};

const info = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.info(...args);
	}
};

const warn = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.warn(...args);
	}
};

const error = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.error(...args);
	}
};

export const client = {
	log,
	info,
	warn,
	error,
};
