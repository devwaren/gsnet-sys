const envClient = {
	browser: {
		nodeEnv: import.meta.env.MODE,
		isProd: import.meta.env.PROD,
		isDev: import.meta.env.DEV,
	},
	client: {
		baseUrl: import.meta.env.BASE_URL,
	},
};

export { envClient };
