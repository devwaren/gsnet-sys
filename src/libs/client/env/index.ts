const envClient = {
	browser: {
		nodeEnv: import.meta.env.MODE,
		isProd: import.meta.env.PROD,
		isDev: import.meta.env.DEV,
	},
};

export { envClient };
