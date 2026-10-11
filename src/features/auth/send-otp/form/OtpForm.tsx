import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useOtpForm } from "./hooks";

type Props = ComponentProps<"form">;

export function OtpForm({ children, className }: Props) {
	const form = useOtpForm();

	return (
		<Form {...form} className={className}>
			{children}
		</Form>
	);
}
