import { timingSafeEqual } from "node:crypto";
import { createMiddleware } from "@tanstack/react-start";

import { gen } from "#/libs/server/gen";

const internal = createMiddleware({
	type: "request",
}).server(async ({ request, next }) => {
	const signature = request.headers.get("x-internal-signature");
	const timestamp = request.headers.get("x-internal-timestamp");

	// Hide the existence of the internal API.
	if (!signature || !timestamp) {
		return new Response(null, {
			status: 404,
		});
	}

	const timestampNumber = Number(timestamp);

	if (!Number.isSafeInteger(timestampNumber)) {
		return new Response(null, {
			status: 404,
		});
	}

	// Prevent replay attacks.
	const MAX_AGE = 5 * 60 * 1000;

	if (Math.abs(Date.now() - timestampNumber) > MAX_AGE) {
		return new Response(null, {
			status: 404,
		});
	}

	// SHA-256 HMAC = 64 hexadecimal characters.
	if (!/^[a-f0-9]{64}$/i.test(signature)) {
		return new Response(null, {
			status: 404,
		});
	}

	const url = new URL(request.url);
	const body = await request.clone().text();

	const payload = [
		request.method.toUpperCase(),
		url.pathname + url.search,
		timestampNumber,
		body,
	].join(":");

	const expected = gen.internalToken(payload);

	const providedBuffer = Buffer.from(signature, "hex");
	const expectedBuffer = Buffer.from(expected, "hex");

	if (
		providedBuffer.length !== expectedBuffer.length ||
		!timingSafeEqual(providedBuffer, expectedBuffer)
	) {
		return new Response(null, {
			status: 404,
		});
	}

	return next();
});

export { internal };
