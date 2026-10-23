import { auth } from "./auth";
import { invoices } from "./billing/invoices";
import { clients } from "./client";
import { settings } from "./settings";
import { users } from "./users";

export const services = {
	auth,
	clients,
	users,
	settings,
	invoices,
};
