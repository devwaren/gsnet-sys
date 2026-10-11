import { cva } from "class-variance-authority";

const form = cva([
	"w-full",
	"min-h-80",
	"rounded-xl",
	"border border-gray-200",
	"bg-white",
	"p-5 sm:p-6 lg:p-8",
	"shadow-sm",
	"transition-shadow",
	"duration-200",
	"hover:shadow-md",
]);

const title = {
	container: cva(["mb-6", "space-y-1"]),

	name: cva([
		"text-xl",
		"font-semibold",
		"leading-tight",
		"tracking-tight",
		"text-gray-900",
		"sm:text-2xl",
	]),

	desc: cva([
		"max-w-2xl",
		"text-sm",
		"leading-6",
		"text-gray-500",
		"sm:text-base",
	]),
};

export const styles = {
	form,
	title,
};
