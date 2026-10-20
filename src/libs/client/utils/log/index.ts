import { envClient } from "#/libs/client/env";

const logs = "[client]";

const log = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.log(logs, ...args);
	}
};

const info = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.info(logs, ...args);
	}
};

const warn = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.warn(logs, ...args);
	}
};

const error = (...args: unknown[]) => {
	if (!envClient.browser.isProd) {
		console.error(logs, ...args);
	}
};

export const client = {
	log,
	info,
	warn,
	error,
};
