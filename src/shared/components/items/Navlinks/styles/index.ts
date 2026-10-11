import { cva } from "class-variance-authority";

const container = cva("flex flex-col gap-1.5");

const links = cva(
	[
		"group flex items-center gap-3",
		"rounded-xl border border-transparent",
		"px-4 py-3 text-sm font-medium",
		"text-gray-500",
		"transition-all duration-200 ease-out",
		"hover:bg-gray-50 hover:text-gray-900",
		"focus-visible:outline-none focus-visible:ring-2",
		"focus-visible:ring-green-500 focus-visible:ring-offset-2",
	].join(" "),
);

const activeLinks = cva(
	[
		"border-green-100 bg-green-50",
		"font-semibold text-green-700",
		"shadow-sm shadow-green-900/5",
		"hover:border-green-100 hover:bg-green-50",
		"hover:text-green-700",
	].join(" "),
);

export const styles = {
	container,
	links,
	activeLinks,
};
