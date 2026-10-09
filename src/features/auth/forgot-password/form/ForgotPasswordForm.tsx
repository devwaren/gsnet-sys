import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { SubmitButton } from "#/shared/components/buttons";
import { useForgotPasswordForm } from "./hooks";

type Props = ComponentProps<"form">;

export function ForgotPasswordForm({ children, className }: Props) {
	const { form } = useForgotPasswordForm();

	return (
		<Form {...form} className={className}>
			{children}
			<SubmitButton label="Submit" loadinglabel="Submitting" />
		</Form>
	);
}
