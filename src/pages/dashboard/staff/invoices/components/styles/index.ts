import { cva } from "class-variance-authority";

const summaryMapper = cva("grid w-full grid-cols-1 gap-4 sm:grid-cols-2");

const icons = cva(
	"flex items-start justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5",
);

const h2 = cva("text-sm font-medium text-gray-600");

const value = cva("text-2xl font-semibold tracking-tight");

const desc = cva("text-sm text-gray-500");

export const styles = {
	icons,
	h2,
	value,
	summaryMapper,
	desc,
};
