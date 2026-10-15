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
		| "inputgen"
		| "date";
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	items?: {
		label: string;
		value: string;
	}[];
};
