import { cva } from "class-variance-authority";

const container = cva("text-sm");

const label = cva("inline-flex items-center gap-2 cursor-pointer select-none");

const checkbox = cva("size-4 cursor-pointer accent-blue-600");

const error = cva("border px-4 py-2", {
	variants: {
		theme: {
			light: "border-red-600 bg-red-100 text-red-600",
			dark: "border-red-400 bg-red-950 text-red-400",
		},
	},
	defaultVariants: {
		theme: "light",
	},
});

export const styles = {
	container,
	label,
	checkbox,
	error,
};
