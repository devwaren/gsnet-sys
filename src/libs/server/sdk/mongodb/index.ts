import {
	checkAdmin,
	getProfile,
	getRole,
	getSession,
	login,
	logout,
	register,
} from "./services";

export const mongoSDK = {
	services: {
		auth: {
			login,
			logout,
			register,
			getProfile,
			getSession,
			getRole,
			checkAdmin,
		},
	},
};
