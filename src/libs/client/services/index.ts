import { getAuthorization, login, logout, verifyAdmin } from "./auth";

const services = {
	auth: {
		login,
		logout,
		getAuthorization,
		verifyAdmin,
	},
};

export { services };
