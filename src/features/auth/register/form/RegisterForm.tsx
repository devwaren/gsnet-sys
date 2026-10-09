import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { SubmitButton } from "#/shared/components/buttons";
import { useRegisterForm } from "./hooks";

type Props = ComponentProps<"form">;

export function RegisterForm({ className, children }: Props) {
	const { form } = useRegisterForm();

	return (
		<Form {...form} className={className}>
			{children}
			<SubmitButton label="Register" loadinglabel="Registering" />
		</Form>
	);
}
