import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useChangePasswordForm } from "./hooks";

type Props = ComponentProps<"form">;

export function ChangePasswordForm({ children, ...props }: Props) {
	const form = useChangePasswordForm();

	return (
		<Form {...form} {...props}>
			{children}
		</Form>
	);
}
