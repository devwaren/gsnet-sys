import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { FormProps } from "#/features/types";
import { SubmitButton } from "#/shared/components/buttons";
import { useLoginForm } from "./hooks";

export function LoginForm({ children, className }: FormProps) {
	const { form } = useLoginForm();

	return (
		<Form {...form} className={className}>
			{children}
			<SubmitButton label="Log in" loadinglabel="Loggin in" />
		</Form>
	);
}
