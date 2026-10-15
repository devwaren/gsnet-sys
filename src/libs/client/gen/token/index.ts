import { createServerFn } from "@tanstack/react-start";
import { signJWT } from "#/libs/server/gen/tokens";

export const generateJWT = createServerFn().handler(async () => signJWT());
