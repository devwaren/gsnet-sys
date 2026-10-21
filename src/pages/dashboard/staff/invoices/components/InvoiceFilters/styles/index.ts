import { cva } from "class-variance-authority";

const card = cva(
	"flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 transition-colors focus-within:border-blue-500",
);

const input = cva(
	"w-full bg-transparent outline-none placeholder:text-gray-400",
);

const invoiceCards = cva("grid gap-3 sm:grid-cols-2 lg:grid-cols-3");

export const styles = {
	card,
	input,
	invoiceCards,
};
