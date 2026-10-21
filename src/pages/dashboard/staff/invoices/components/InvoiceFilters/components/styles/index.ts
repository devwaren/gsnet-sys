import { cva } from "class-variance-authority";

const article = cva(
	"space-y-4 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300",
);

const invoiceContent = cva("flex items-start justify-between gap-3");

const dueDate = cva(
	"flex items-center justify-between border-t border-gray-100 pt-3",
);

const status = cva(
	"shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize",
);

const h3 = cva("truncate text-sm font-semibold text-gray-900");

const date = cva("text-xl font-semibold tracking-tight text-gray-900");

const invoiceText = cva("text-xs text-gray-500");

const time = cva("text-xs font-medium text-gray-700");

const customerText = cva("truncate text-sm text-gray-600");

export const styles = {
	article,
	invoiceContent,
	dueDate,
	status,
	h3,
	date,
	invoiceText,
	time,
	customerText,
};
