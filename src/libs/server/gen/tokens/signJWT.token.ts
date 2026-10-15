import { setEnv } from "@dev-waren/mongodb";
import { createServerOnlyFn } from "@tanstack/react-start";
import { SignJWT } from "jose";

export const signJWT = createServerOnlyFn(async () => {
	const secret = setEnv("JWT_SECRET");

	if (!secret) {
		throw new Error("JWT_SECRET is not configured");
	}

	const secretKey = new TextEncoder().encode(secret);

	const token = await new SignJWT({
		purpose: "generated-token",
	})
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setIssuedAt()
		.setExpirationTime("15m")
		.sign(secretKey);

	return { token };
});
