import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const container = cva("text-sm w-full");

const inputContainer = cva(
	"flex rounded-md border border-gray-200 px-4 py-2 text-gray-600 transition-colors focus-within:border-gray-400",
);

const input = cva(
	"w-full bg-transparent outline-none placeholder:text-gray-400 focus-visible:outline-none",
);

const button = cva(
	"shrink-0 text-gray-400 transition-colors hover:text-gray-700",
);

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
				light: "border-red-200 bg-red-50 text-red-600",
				dark: "border-red-900/60 bg-red-950/40 text-red-400",
			},
		},
		defaultVariants: {
			theme: "light",
		},
	},
);

export const styles = {
	container,
	input: (className?: string) => twMerge(input(), className),
	inputContainer,
	error,
	button,
};
