import {
	Checkbox,
	Input,
	InputGen,
	Radio,
	Select,
	Textarea,
} from "#/shared/components/inputs";
import type { FormField } from "#/shared/types";

export function Switcher(field: FormField) {
	switch (field.type) {
		case "select":
			return <Select {...field} />;

		case "textarea":
			return <Textarea {...field} />;

		case "checkbox":
			return <Checkbox {...field} />;

		case "inputgen":
			return <InputGen {...field} />;

		case "radio":
			return <Radio {...field} />;
		default:
			return <Input {...field} />;
	}
}
