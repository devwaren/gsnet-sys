import { cva } from "class-variance-authority";

const form = cva([
	"rounded-3xl border border-white/50 bg-white/85 p-6 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl sm:p-9 min-h-[20em]",
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
