import { Form } from "@dev-waren/react-form-kit/hook-form";
import type { ComponentProps } from "react";
import { useErrorState } from "#/shared/store/error";
import { useForgotPasswordForm } from "./hooks";

type Props = ComponentProps<"form">;

export function ForgotPasswordForm({ children, className }: Props) {
	const { form, isPending } = useForgotPasswordForm();
	const { error } = useErrorState();

	return (
		<Form {...form} className={className}>
			{children}
			<button
				type="submit"
				className="px-4 py-2 text-sm bg-green-200 rounded-lg w-full"
			>
				{isPending ? "Submitting..." : "Submit"}
			</button>

			{error && <p className="text-red-400">{error}</p>}
		</Form>
	);
}
