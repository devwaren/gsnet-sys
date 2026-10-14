import { cva } from "class-variance-authority";

const container = cva("text-sm");

const selectContainer = cva(
	" w-full cursor-pointer border border-gray-300 rounded-md",
);

const select = cva(
	"border-0 px-4 py-2 bg-transparent outline-none focus:ring-0 w-full  cursor-pointer",
);

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
	select,
	selectContainer,
	error,
};
