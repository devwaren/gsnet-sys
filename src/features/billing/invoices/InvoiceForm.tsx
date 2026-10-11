import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useInvoiceForm } from "./form";

type Props = ComponentProps<"form">;

export function InvoiceForm({ children, className }: Props) {
	const form = useInvoiceForm();

	return (
		<Form {...form} className={className}>
			{children}
		</Form>
	);
}
