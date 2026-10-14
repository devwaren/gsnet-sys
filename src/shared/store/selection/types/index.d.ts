import type { z } from "@dev-waren/react-form-kit";
import type { schema } from "#/libs/shared/validations";

type ClientSchema = z.infer<typeof schema.customer.client> & {
	pppoeId?: string;
};

export type SelectionState = {
	selection: ClientSchema[];
	setSelection: (selection: ClientSchema) => void;
	clearSelection: () => void;
};
