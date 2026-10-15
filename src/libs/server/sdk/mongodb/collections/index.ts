import { schemaServer } from "#/libs/server/schema";
import { collection } from "../config";

export const collections = {
	users: collection({
		name: "users",
		schema: schemaServer.user,
	}),
	accounts: collection({
		name: "accounts",
		schema: schemaServer.accounts,
	}),
	sessions: collection({
		name: "sessions",
		schema: schemaServer.sessions,
	}),
	roles: collection({
		name: "roles",
		schema: schemaServer.roles,
	}),
	clients: collection({
		name: "clients",
		schema: schemaServer.clients,
	}),
	tokens: collection({
		name: "tokens",
		schema: schemaServer.csrf,
	}),
};
