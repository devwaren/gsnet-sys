export const serverOnly = () => {
	if (typeof window !== "undefined") {
		throw new Error("httpServer can only be used on the server.");
	}
};
