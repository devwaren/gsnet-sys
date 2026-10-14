export type FormField = {
	name: string;
	type:
		| "select"
		| "textarea"
		| "checkbox"
		| "radio"
		| "email"
		| "password"
		| "text"
		| "date";
	placeholder?: string;
	className?: string;
	items?: {
		label: string;
		value: string;
	}[];
};
