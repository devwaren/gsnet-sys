import { cva } from "class-variance-authority";

const header = cva(
	"flex items-center gap-2 p-4 bg-white border-b border-gray-200",
);

const details = cva("flex items-center gap-2");

const profile = {
	container: cva(
		"w-12 h-12 rounded-full overflow-hidden border border-gray-300 p-1",
	),
	avatar: cva("w-full h-full rounded-full"),
};

export const styles = {
	header,
	details,
	profile,
};
