import { cva } from "class-variance-authority";

const button = cva([
	"mt-2 inline-flex",
	"items-center",
	"justify-center gap-2",
	"rounded-lg",
	"bg-green-600",
	"px-4 py-2",
	"text-sm",
	"font-medium",
	"text-white",
	"transition",
	"hover:bg-green-700",
	"disabled:cursor-not-allowed",
	"disabled:opacity-50",
]);

export const styles = {
	button,
};
