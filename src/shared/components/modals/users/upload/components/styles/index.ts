import { cva } from "class-variance-authority";

const button = cva(
	"flex min-h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-6 transition-colors",
	{
		variants: {
			state: {
				idle: "border-gray-300 hover:border-blue-400",
				dragging: "border-blue-500 bg-blue-50",
			},
		},
		defaultVariants: {
			state: "idle",
		},
	},
);

export const styles = {
	root: "w-full space-y-2",
	input: "hidden",
	wrapper: "relative",
	button,
	preview: "pointer-events-none max-h-64 max-w-full rounded-lg object-contain",
	fileName: "mt-3 max-w-full truncate text-sm text-gray-600",
	icon: "mb-3 text-gray-400",
	title: "text-sm font-medium text-gray-700",
	description: "mt-1 text-xs text-gray-500",
	remove:
		"absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black",
	error: "text-sm text-red-500",
};
