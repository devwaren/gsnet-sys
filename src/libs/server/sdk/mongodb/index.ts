import { auth } from "./services/auth";
import { clients } from "./services/clients";
import { users } from "./services/users";

export const mongoSDK = {
	services: {
		auth,
		clients,
		users,
	},
};
