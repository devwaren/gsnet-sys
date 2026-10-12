import { setEnv } from "@dev-waren/mongodb";

const encryptionKey = () => {
	const value = setEnv("MFA_ENCRYPTION_KEY");

	if (!value || !/^[0-9a-fA-F]{64}$/.test(value)) {
		throw new Error("Invalid MFA_ENCRYPTION_KEY");
	}

	return Buffer.from(value, "hex");
};

export { encryptionKey };

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const getKey = () => {
	const secret = setEnv("USER_ID_ENCRYPTION_KEY");

	const key = Buffer.from(secret, "base64");

	if (key.length !== 32) {
		throw new Error("Encryption key must be 32 bytes");
	}

	return key;
};

export const encryptUserId = (userId: string) => {
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", getKey(), iv);

	const encrypted = Buffer.concat([
		cipher.update(userId, "utf8"),
		cipher.final(),
	]);

	const tag = cipher.getAuthTag();

	return [
		iv.toString("base64url"),
		tag.toString("base64url"),
		encrypted.toString("base64url"),
	].join(".");
};

export const decryptUserId = (value: string) => {
	const parts = value.split(".");

	if (parts.length !== 3) {
		throw new Error("Invalid encrypted value");
	}

	const [ivEncoded, tagEncoded, dataEncoded] = parts;

	const iv = Buffer.from(ivEncoded, "base64url");
	const tag = Buffer.from(tagEncoded, "base64url");
	const encrypted = Buffer.from(dataEncoded, "base64url");

	if (iv.length !== 12 || tag.length !== 16 || encrypted.length === 0) {
		throw new Error("Invalid encrypted value");
	}

	const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
	decipher.setAuthTag(tag);

	return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
		"utf8",
	);
};
