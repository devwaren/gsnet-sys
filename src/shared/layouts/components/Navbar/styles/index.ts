import { cva } from "class-variance-authority";

const header = cva(
	"sticky top-0 z-30 flex w-full items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6",
);

const details = cva("flex shrink-0 items-center gap-2 sm:gap-4");

const profile = {
	container: cva(
		"size-9 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-50 sm:size-10",
	),
	avatar: cva("size-full rounded-full object-cover"),
};

const settings = cva(
	"flex size-9 items-center justify-center rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
);

export const styles = {
	header,
	details,
	profile,
	settings,
};
