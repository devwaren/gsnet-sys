import type { z } from "@dev-waren/react-form-kit";

type ClientSchema = z.infer<z.AnyZodObject>;

export type SelectionState = {
	selection: ClientSchema[];
	setSelection: (selection: ClientSchema) => void;
	clearSelection: () => void;
};
