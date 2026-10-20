import { cva } from "class-variance-authority";

const form = cva("w-full space-y-6");

const icon = cva(
	"flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600",
);

const header = cva("flex items-center gap-3");

const h2 = cva("text-lg font-semibold tracking-tight text-gray-900");

const p = cva("text-sm text-gray-500");

const buttonContainer = cva(
	"flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end",
);

const uploadButton = cva([
	"inline-flex",
	"w-full items-center",
	"justify-center gap-2",
	"rounded-xl bg-blue-600",
	"px-5 py-3 text-sm font-semibold",
	"text-white shadow-sm transition",
	"hover:bg-blue-700 focus-visible:outline-none",
	"focus-visible:ring-2 focus-visible:ring-blue-500",
	"focus-visible:ring-offset-2 active:scale-[0.99]",
	"sm:w-auto",
]);

const shieldContainer = cva("flex items-start gap-2 text-xs text-gray-500");

const shieldIcon = cva("mt-0.5 shrink-0");

export const styles = {
	form,
	header,
	icon,
	h2,
	p,
	shieldIcon,
	shieldContainer,
	uploadButton,
	buttonContainer,
};
