export type FormField = {
	name: string;
	type: "select" | "textarea" | "checkbox" | "radio" | "email" | "password";
	placeholder?: string;
	className?: string;
};
