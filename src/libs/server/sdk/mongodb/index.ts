import { login, profile, register } from "./services";

export const mongoSDK = {
	services: {
		auth: {
			login,
			register,
			profile,
		},
	},
};
