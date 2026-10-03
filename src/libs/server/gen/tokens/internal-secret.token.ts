import { createHmac } from "node:crypto";
import { env } from "#/libs/server/env";

const internalToken = (payload: string) => {
	return createHmac("sha256", env.server.secrets.internal)
		.update(payload)
		.digest("hex");
};

export { internalToken };
