import { objectId, sanitize, z } from "@dev-waren/mongodb";

export const qrcode = z.object({
	userId: objectId,
	enabled: z.boolean().default(false),
	encryptedSecret: z.string().transform(sanitize).nullable().default(null),
	pendingEncryptedSecret: z
		.string()
		.transform(sanitize)
		.nullable()
		.default(null),
	updatedAt: z.date().default(() => new Date()),
});
