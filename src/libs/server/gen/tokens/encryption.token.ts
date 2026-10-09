import { setEnv } from "@dev-waren/mongodb";

const encryptionKey = () => {
	const value = setEnv("MFA_ENCRYPTION_KEY");

	if (!value || !/^[0-9a-fA-F]{64}$/.test(value)) {
		throw new Error("Invalid MFA_ENCRYPTION_KEY");
	}

	return Buffer.from(value, "hex");
};

export { encryptionKey };
