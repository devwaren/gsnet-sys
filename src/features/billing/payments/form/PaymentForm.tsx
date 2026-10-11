import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { usePaymentForm } from "./hooks";

type Props = ComponentProps<"form">;

export function PaymentForm({ children, className }: Props) {
	const form = usePaymentForm();

	return (
		<Form {...form} className={className}>
			{children}
		</Form>
	);
}
