import { auth } from "./services/auth";
import { clients } from "./services/clients";

export const mongoSDK = {
	services: {
		auth,
		clients,
	},
};
