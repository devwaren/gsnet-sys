export const clientOnly = (name: string) => {
	if (typeof window === "undefined" || typeof document === "undefined") {
		throw new Error(`${name} can only be used in the client.`);
	}
};
