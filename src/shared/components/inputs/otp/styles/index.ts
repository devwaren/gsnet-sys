import { cva } from "class-variance-authority";

const input = cva(
	"h-14 w-12 rounded-xl border text-center text-xl font-semibold outline-none border-gray-400 focus:ring-2",
);

export const styles = {
	input,
};
