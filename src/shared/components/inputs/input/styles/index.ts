import { cva } from "class-variance-authority";

const container = cva("text-sm");

const inputContainer = cva(
	"px-4 py-2 border border-gray-200 rounded-md flex text-gray-600",
);

const input = cva("w-full outline-none");

const button = cva("text-gray-400");

const error = cva(
	[
		"my-1",
		"rounded-lg",
		"border px-4 py-2.5",
		"text-sm",
		"transition-all duration-200",
		"animate-in fade-in slide-in-from-top-1",
	].join(" "),
	{
		variants: {
			theme: {
				light: ["border-red-200", "bg-red-50", "text-red-600"].join(" "),

				dark: ["border-red-900/60", "bg-red-950/40", "text-red-400"].join(" "),
			},
		},

		defaultVariants: {
			theme: "light",
		},
	},
);

export const styles = {
	container,
	input,
	inputContainer,
	error,
	button,
};
