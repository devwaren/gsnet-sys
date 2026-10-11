import {
	checkAdmin,
	getProfile,
	getRole,
	getSession,
	login,
	register,
} from "./services";

export const mongoSDK = {
	services: {
		auth: {
			login,
			register,
			getProfile,
			getSession,
			getRole,
			checkAdmin,
		},
	},
};
