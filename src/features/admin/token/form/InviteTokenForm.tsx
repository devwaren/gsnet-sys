import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useInviteTokenForm } from "./hooks";

type Props = ComponentProps<"form">;

export function InviteTokenForm({ children, ...props }: Props) {
	const form = useInviteTokenForm();

	return (
		<Form {...form} {...props}>
			{children}
		</Form>
	);
}
