import { z } from "@dev-waren/mongodb";

export const jwt = z
	.string()
	.regex(/^[\w-]+\.[\w-]+\.[\w-]+$/, "Invalid JWT format");
