import { z } from "@dev-waren/react-form-kit";

export const jwt = z
	.string()
	.regex(/^[\w-]+\.[\w-]+\.[\w-]+$/, "Invalid JWT format");
