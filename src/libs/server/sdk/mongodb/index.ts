import { auth } from "./services/auth";
import { clients } from "./services/clients";
import { settings } from "./services/settings";
import { users } from "./services/users";

export const mongoSDK = {
	services: {
		auth,
		clients,
		users,
		settings,
	},
};
