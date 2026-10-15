import { setEnv } from "@dev-waren/mongodb";
import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
	origin: setEnv("BASE_URL"),
});

export const startInstance = createStart(() => ({
	requestMiddleware: [csrfMiddleware],
}));
