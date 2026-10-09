import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { SubmitButton } from "#/shared/components/buttons";
import { useResetPasswordForm } from "./hooks";

type Props = ComponentProps<"form">;

export function ResetPasswordForm({ children, className }: Props) {
	const { form } = useResetPasswordForm();

	return (
		<Form {...form} className={className}>
			{children}
			<SubmitButton label="Save" loadinglabel="Saving" />
		</Form>
	);
}
