import { createServerFn } from "@tanstack/react-start";
import { session } from "./session.service";

export const getSession = createServerFn({
	method: "GET",
}).handler(async () => {
	return await session();
});
