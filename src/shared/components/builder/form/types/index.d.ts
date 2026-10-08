export type Field = {
	name: string;
	type: "select" | "textarea" | "checkbox" | "radio" | "email" | "password";
	props?: Record<string, unknown>;
};

export type FormConfig = {
	title: string;
	fields: Field[];
};
