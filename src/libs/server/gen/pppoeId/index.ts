export const pppoeId = (firstName: string, lastName: string) => {
	const now = new Date();

	const parts = new Intl.DateTimeFormat("en", {
		timeZone: "Asia/Manila",
		year: "numeric",
		day: "2-digit",
	}).formatToParts(now);

	const year = parts.find((part) => part.type === "year")?.value;
	const day = parts.find((part) => part.type === "day")?.value;

	const firstInitial = firstName.trim().charAt(0).toUpperCase();

	const lastInitials = lastName
		.trim()
		.replace(/\s+/g, "")
		.slice(0, 2)
		.toUpperCase();

	return `${firstInitial}${lastInitials}-${year}-${day}`;
};
