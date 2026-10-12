import {
	authorization,
	checkAdmin,
	getUserRole,
	login,
	logout,
	profile,
	register,
	session,
} from "./services";

export const mongoSDK = {
	services: {
		auth: {
			login,
			logout,
			register,
			session,
			profile,
			getUserRole,
			checkAdmin,
			authorization,
		},
	},
};
