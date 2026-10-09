import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { setEnv } from "@dev-waren/mongodb";

function getEncryptionKey() {
	const value = setEnv("MFA_ENCRYPTION_KEY");

	if (!value || !/^[0-9a-fA-F]{64}$/.test(value)) {
		throw new Error("Invalid MFA_ENCRYPTION_KEY");
	}

	return Buffer.from(value, "hex");
}

export function encryptSecret(secret: string) {
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);

	const encrypted = Buffer.concat([
		cipher.update(secret, "utf8"),
		cipher.final(),
	]);

	const tag = cipher.getAuthTag();

	return [
		iv.toString("base64"),
		tag.toString("base64"),
		encrypted.toString("base64"),
	].join(".");
}

export function decryptSecret(payload: string) {
	const [iv, tag, encrypted] = payload.split(".");

	if (!iv || !tag || !encrypted) {
		throw new Error("Invalid encrypted MFA secret");
	}

	const decipher = createDecipheriv(
		"aes-256-gcm",
		getEncryptionKey(),
		Buffer.from(iv, "base64"),
	);

	decipher.setAuthTag(Buffer.from(tag, "base64"));

	return Buffer.concat([
		decipher.update(Buffer.from(encrypted, "base64")),
		decipher.final(),
	]).toString("utf8");
}
