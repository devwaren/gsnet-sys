import { z } from "@dev-waren/react-form-kit";

export const preferences = z.object({
	theme: z.enum(["light", "dark", "system"]),
	sidebarCollapsed: z.boolean(),
	density: z.enum(["compact", "comfortable"]),
});
