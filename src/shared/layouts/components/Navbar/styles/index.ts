import { cva } from "class-variance-authority";

const header = cva(
	"flex w-full items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-3",
);

const details = cva("flex shrink-0 items-center gap-4");

const profile = {
	container: cva(
		"size-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-50",
	),
	avatar: cva("size-full rounded-full object-cover"),
};

const settings = cva(
	"flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900",
);

export const styles = {
	header,
	details,
	profile,
	settings,
};
