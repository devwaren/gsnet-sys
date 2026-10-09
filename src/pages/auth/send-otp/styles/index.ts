import { cva } from "class-variance-authority";

const form = cva("mx-auto w-full max-w-md");

const container = cva(
	"space-y-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8",
);

const icon = cva(
	"mx-auto flex size-16 items-center justify-center rounded-2xl bg-green-50 text-green-600",
);

const content = cva("space-y-2 text-center");

const heading = {
	h1: cva("text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"),
	h2: cva("text-center text-sm font-semibold text-gray-700"),
};

const desc = {
	p1: cva("text-sm leading-6 text-gray-500"),
	p2: cva("text-center text-xs text-gray-500"),
	p3: cva("text-center text-xs leading-5 text-gray-500"),
};

const otp = {
	section: cva("space-y-4"),
	wrapper: cva("flex justify-center"),
};

const footer = cva("border-t border-gray-100 pt-5");

export const styles = {
	form,
	container,
	icon,
	content,
	heading,
	desc,
	otp,
	footer,
};
