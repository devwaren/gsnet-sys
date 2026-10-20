export const serverOnly = (name: string) => {
	if (typeof window !== "undefined") {
		throw new Error(`${name} can only be used on the server.`);
	}
};
