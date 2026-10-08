import { cva } from "class-variance-authority";

const container = cva("text-sm");

const textareaContainer = cva("px-4 py-2");

const textarea = cva("w-full min-h-32 resize-y outline-none bg-transparent");

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
	textarea,
	textareaContainer,
	error,
};
