import { setEnv } from "@dev-waren/mongodb";
import { createCsrfMiddleware } from "@tanstack/react-start";

const csrf = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
	origin: setEnv("BASE_URL"),
});

export { csrf };
