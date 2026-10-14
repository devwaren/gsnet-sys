import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useAddClientForm } from "./hooks";

type Props = ComponentProps<"form">;

export function AddClientForm({ children, className }: Props) {
	const form = useAddClientForm();

	return (
		<Form {...form} className={className}>
			{children}
		</Form>
	);
}
