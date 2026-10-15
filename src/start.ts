import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
	origin: process.env.BASE_URL,
});

export const startInstance = createStart(() => ({
	requestMiddleware: [csrfMiddleware],
}));
